import { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Progress } from '@/app/components/ui/progress';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

interface AnalysisResult {
  foodName: string;
  nutrition: NutritionData;
  portionSize: string;
  healthScore: number;
  recommendations: string[];
  warnings: string[];
  dietaryConsiderations: {
    halal: boolean;
    kosher: boolean;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
}

export default function FoodAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Моковые данные для демонстрации
  const mockAnalysis: AnalysisResult[] = [
    {
      foodName: 'Куриная грудка с овощами',
      nutrition: {
        calories: 450,
        protein: 45,
        carbs: 32,
        fats: 12,
        fiber: 8
      },
      portionSize: '350г',
      healthScore: 92,
      recommendations: [
        'Отличный выбор! Высокое содержание белка поддержит мышечную массу',
        'Хорошее соотношение БЖУ для обеда или после тренировки',
        'Достаточно клетчатки для здорового пищеварения'
      ],
      warnings: [],
      dietaryConsiderations: {
        halal: true,
        kosher: false,
        vegetarian: false,
        vegan: false,
        glutenFree: true
      }
    },
    {
      foodName: 'Бургер с картофелем фри',
      nutrition: {
        calories: 980,
        protein: 28,
        carbs: 92,
        fats: 52,
        fiber: 4
      },
      portionSize: '450г',
      healthScore: 35,
      recommendations: [
        'Высокая калорийность - подходит только для редкого употребления',
        'Рассмотрите более здоровые альтернативы: куриный бургер с салатом',
        'Если едите, уменьшите размер порции на 30-40%'
      ],
      warnings: [
        'Избыток насыщенных жиров может повысить холестерин',
        'Мало клетчатки - добавьте овощной салат',
        'Высокое содержание натрия - пейте больше воды'
      ],
      dietaryConsiderations: {
        halal: false,
        kosher: false,
        vegetarian: false,
        vegan: false,
        glutenFree: false
      }
    },
    {
      foodName: 'Греческий салат с фетой',
      nutrition: {
        calories: 320,
        protein: 18,
        carbs: 24,
        fats: 18,
        fiber: 6
      },
      portionSize: '300г',
      healthScore: 88,
      recommendations: [
        'Прекрасный источник полезных жиров и антиоксидантов',
        'Идеально подходит для лёгкого ужина',
        'Средиземноморская диета - одна из самых здоровых!'
      ],
      warnings: [],
      dietaryConsiderations: {
        halal: true,
        kosher: true,
        vegetarian: true,
        vegan: false,
        glutenFree: true
      }
    },
    {
      foodName: 'Овсяная каша с ягодами и орехами',
      nutrition: {
        calories: 385,
        protein: 14,
        carbs: 58,
        fats: 11,
        fiber: 12
      },
      portionSize: '280г',
      healthScore: 95,
      recommendations: [
        'Идеальный завтрак для энергии и концентрации',
        'Высокое содержание клетчатки нормализует пищеварение',
        'Медленные углеводы обеспечат энергией на 3-4 часа'
      ],
      warnings: [],
      dietaryConsiderations: {
        halal: true,
        kosher: true,
        vegetarian: true,
        vegan: true,
        glutenFree: false
      }
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    setResult(null);

    // Симулируем анализ изображения
    setTimeout(() => {
      const randomResult = mockAnalysis[Math.floor(Math.random() * mockAnalysis.length)];
      setResult(randomResult);
      setAnalyzing(false);
    }, 2000 + Math.random() * 1000);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Отлично';
    if (score >= 60) return 'Хорошо';
    if (score >= 40) return 'Удовлетворительно';
    return 'Нездоровая пища';
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="size-8" />
            <h1 className="text-3xl">Анализ питания по фото</h1>
          </div>
          <p className="text-purple-100">AI определит калории и даст персональные рекомендации</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Загрузите фото блюда</CardTitle>
            <CardDescription>
              Сделайте фото еды или загрузите изображение для анализа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col gap-4">
              {!selectedImage ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <Upload className="size-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">Нажмите для загрузки фото</p>
                  <p className="text-sm text-gray-500">Или перетащите изображение сюда</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Selected food" 
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="size-4 mr-2" />
                    Загрузить другое фото
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analyzing State */}
        {analyzing && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Sparkles className="size-12 text-purple-600 animate-pulse" />
                </div>
                <p className="text-lg">Анализирую изображение...</p>
                <p className="text-sm text-gray-600">
                  AI определяет блюдо, калорийность и пищевую ценность
                </p>
                <Progress value={75} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && !analyzing && (
          <div className="space-y-6">
            {/* Food Name & Health Score */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{result.foodName}</CardTitle>
                    <CardDescription>Порция: {result.portionSize}</CardDescription>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl ${getHealthScoreColor(result.healthScore)}`}>
                      {result.healthScore}
                    </div>
                    <p className="text-sm text-gray-600">{getHealthScoreLabel(result.healthScore)}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Nutrition Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Пищевая ценность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Калории</span>
                      <span className="text-2xl text-orange-600">{result.nutrition.calories} ккал</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Белки</p>
                      <p className="text-xl text-blue-600">{result.nutrition.protein}г</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Углеводы</p>
                      <p className="text-xl text-green-600">{result.nutrition.carbs}г</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Жиры</p>
                      <p className="text-xl text-purple-600">{result.nutrition.fats}г</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Клетчатка</p>
                      <p className="text-xl text-teal-600">{result.nutrition.fiber}г</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dietary Considerations */}
            <Card>
              <CardHeader>
                <CardTitle>Религиозные и диетические ограничения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.dietaryConsiderations.halal && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      ✓ Halal
                    </Badge>
                  )}
                  {result.dietaryConsiderations.kosher && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      ✓ Kosher
                    </Badge>
                  )}
                  {result.dietaryConsiderations.vegetarian && (
                    <Badge variant="outline" className="bg-lime-50 text-lime-700 border-lime-200">
                      ✓ Вегетарианское
                    </Badge>
                  )}
                  {result.dietaryConsiderations.vegan && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      ✓ Веганское
                    </Badge>
                  )}
                  {result.dietaryConsiderations.glutenFree && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      ✓ Без глютена
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="size-5 text-green-600" />
                <AlertTitle className="text-green-800">Рекомендации</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-2 text-green-700">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="size-5 text-orange-600" />
                <AlertTitle className="text-orange-800">Предупреждения</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-2 text-orange-700">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-0.5">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Info */}
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="size-5 text-blue-600" />
              <AlertTitle className="text-blue-800">Информация</AlertTitle>
              <AlertDescription className="text-blue-700">
                Данные рассчитаны с помощью AI и могут иметь погрешность ±10%. 
                Для точного расчёта воспользуйтесь профилем пользователя и укажите ваши 
                цели, здоровье и религиозные предпочтения.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
