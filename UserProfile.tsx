import { useState, useEffect } from 'react';
import { User, Save, Activity, Heart, Target, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface UserData {
  // Личные данные
  firstName: string;
  lastName: string;
  middleName: string;
  age: string;
  gender: string;
  
  // Физические параметры
  height: string;
  weight: string;
  targetWeight: string;
  activityLevel: string;
  
  // Здоровье
  healthIssues: string[];
  allergies: string;
  medications: string;
  
  // Религия и диета
  religion: string;
  dietaryRestrictions: string[];
  
  // Цели
  goal: string;
  dailyCalories: number;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    middleName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
    activityLevel: '',
    healthIssues: [],
    allergies: '',
    medications: '',
    religion: '',
    dietaryRestrictions: [],
    goal: '',
    dailyCalories: 0
  });

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  useEffect(() => {
    // Загрузка данных из localStorage
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Расчёт BMI
    if (userData.weight && userData.height) {
      const weightKg = parseFloat(userData.weight);
      const heightM = parseFloat(userData.height) / 100;
      const calculatedBmi = weightKg / (heightM * heightM);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) setBmiCategory('Недостаточный вес');
      else if (calculatedBmi < 25) setBmiCategory('Нормальный вес');
      else if (calculatedBmi < 30) setBmiCategory('Избыточный вес');
      else setBmiCategory('Ожирение');
    }
  }, [userData.weight, userData.height]);

  useEffect(() => {
    // Расчёт калорий
    if (userData.weight && userData.height && userData.age && userData.gender && userData.activityLevel && userData.goal) {
      const weight = parseFloat(userData.weight);
      const height = parseFloat(userData.height);
      const age = parseInt(userData.age);

      // Формула Миффлина-Сан Жеора
      let bmr: number;
      if (userData.gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // Коэффициент активности
      const activityMultipliers: { [key: string]: number } = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
      };

      const tdee = bmr * (activityMultipliers[userData.activityLevel] || 1.2);

      // Корректировка на основе цели
      let calories = tdee;
      if (userData.goal === 'lose') calories = tdee - 500;
      else if (userData.goal === 'gain') calories = tdee + 300;

      setUserData(prev => ({ ...prev, dailyCalories: Math.round(calories) }));
    }
  }, [userData.weight, userData.height, userData.age, userData.gender, userData.activityLevel, userData.goal]);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(userData));
    toast.success('Профиль успешно сохранён!');
  };

  const toggleHealthIssue = (issue: string) => {
    setUserData(prev => ({
      ...prev,
      healthIssues: prev.healthIssues.includes(issue)
        ? prev.healthIssues.filter(i => i !== issue)
        : [...prev.healthIssues, issue]
    }));
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setUserData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  const healthIssuesList = [
    'Диабет',
    'Гипертония',
    'Высокий холестерин',
    'Заболевания сердца',
    'Проблемы с щитовидной железой',
    'Гастрит',
    'Непереносимость лактозы'
  ];

  const dietaryRestrictionsList = [
    { value: 'halal', label: 'Халяль' },
    { value: 'kosher', label: 'Кошер' },
    { value: 'vegetarian', label: 'Вегетарианство' },
    { value: 'vegan', label: 'Веганство' },
    { value: 'gluten-free', label: 'Без глютена' },
    { value: 'dairy-free', label: 'Без молочных продуктов' }
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-indigo-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-full">
            <User className="size-8" />
          </div>
          <div>
            <h1 className="text-3xl mb-1">Мой профиль</h1>
            <p className="text-indigo-100">Персональные данные и цели</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Личные данные</TabsTrigger>
            <TabsTrigger value="health">Здоровье</TabsTrigger>
            <TabsTrigger value="goals">Цели</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Личная информация</CardTitle>
                <CardDescription>Основные данные о вас</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={userData.lastName}
                      onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                      placeholder="Иванов"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={userData.firstName}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                      placeholder="Иван"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Отчество</Label>
                    <Input
                      id="middleName"
                      value={userData.middleName}
                      onChange={(e) => setUserData({ ...userData, middleName: e.target.value })}
                      placeholder="Иванович"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      type="number"
                      value={userData.age}
                      onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Пол</Label>
                  <Select value={userData.gender} onValueChange={(value) => setUserData({ ...userData, gender: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите пол" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Мужской</SelectItem>
                      <SelectItem value="female">Женский</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Физические параметры</CardTitle>
                <CardDescription>Рост, вес и уровень активности</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Рост (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={userData.height}
                      onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                      placeholder="175"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={userData.weight}
                      onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                      placeholder="70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetWeight">Целевой вес (кг)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      value={userData.targetWeight}
                      onChange={(e) => setUserData({ ...userData, targetWeight: e.target.value })}
                      placeholder="65"
                    />
                  </div>
                </div>

                {bmi && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Индекс массы тела (BMI)</span>
                      <Badge variant={bmi < 18.5 || bmi > 25 ? 'destructive' : 'default'}>
                        {bmiCategory}
                      </Badge>
                    </div>
                    <div className="text-3xl text-indigo-600">{bmi.toFixed(1)}</div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="activity">Уровень активности</Label>
                  <Select value={userData.activityLevel} onValueChange={(value) => setUserData({ ...userData, activityLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Сидячий образ жизни</SelectItem>
                      <SelectItem value="light">Лёгкая активность (1-3 раза/неделя)</SelectItem>
                      <SelectItem value="moderate">Умеренная активность (3-5 раз/неделя)</SelectItem>
                      <SelectItem value="active">Высокая активность (6-7 раз/неделя)</SelectItem>
                      <SelectItem value="very-active">Очень высокая (2 раза в день)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Религия и диетические предпочтения</CardTitle>
                <CardDescription>Для персонализированных рекомендаций</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="religion">Религия</Label>
                  <Select value={userData.religion} onValueChange={(value) => setUserData({ ...userData, religion: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите религию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Не указано</SelectItem>
                      <SelectItem value="islam">Ислам</SelectItem>
                      <SelectItem value="judaism">Иудаизм</SelectItem>
                      <SelectItem value="christianity">Христианство</SelectItem>
                      <SelectItem value="hinduism">Индуизм</SelectItem>
                      <SelectItem value="buddhism">Буддизм</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Диетические ограничения</Label>
                  <div className="flex flex-wrap gap-2">
                    {dietaryRestrictionsList.map((restriction) => (
                      <Badge
                        key={restriction.value}
                        variant={userData.dietaryRestrictions.includes(restriction.value) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleDietaryRestriction(restriction.value)}
                      >
                        {restriction.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="size-5 text-red-500" />
                  Проблемы со здоровьем
                </CardTitle>
                <CardDescription>
                  Укажите ваши заболевания для правильных рекомендаций
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Выберите заболевания</Label>
                  <div className="flex flex-wrap gap-2">
                    {healthIssuesList.map((issue) => (
                      <Badge
                        key={issue}
                        variant={userData.healthIssues.includes(issue) ? 'destructive' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleHealthIssue(issue)}
                      >
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Аллергии</Label>
                  <Textarea
                    id="allergies"
                    value={userData.allergies}
                    onChange={(e) => setUserData({ ...userData, allergies: e.target.value })}
                    placeholder="Укажите продукты или вещества, на которые у вас аллергия"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Принимаемые лекарства</Label>
                  <Textarea
                    id="medications"
                    value={userData.medications}
                    onChange={(e) => setUserData({ ...userData, medications: e.target.value })}
                    placeholder="Перечислите лекарства, которые вы принимаете регулярно"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-green-500" />
                  Ваши цели
                </CardTitle>
                <CardDescription>Что вы хотите достичь?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Основная цель</Label>
                  <Select value={userData.goal} onValueChange={(value) => setUserData({ ...userData, goal: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите цель" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Похудеть</SelectItem>
                      <SelectItem value="maintain">Поддерживать вес</SelectItem>
                      <SelectItem value="gain">Набрать массу</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {userData.dailyCalories > 0 && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Activity className="size-6 text-green-600" />
                      <div>
                        <h3 className="text-lg">Рекомендуемая калорийность</h3>
                        <p className="text-sm text-gray-600">На основе ваших данных</p>
                      </div>
                    </div>
                    <div className="text-4xl text-green-600 mb-4">
                      {userData.dailyCalories} ккал/день
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Белки</p>
                        <p className="text-lg text-blue-600">
                          {Math.round(userData.dailyCalories * 0.3 / 4)}г
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Углеводы</p>
                        <p className="text-lg text-green-600">
                          {Math.round(userData.dailyCalories * 0.4 / 4)}г
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Жиры</p>
                        <p className="text-lg text-purple-600">
                          {Math.round(userData.dailyCalories * 0.3 / 9)}г
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {userData.weight && userData.targetWeight && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Прогресс к цели</span>
                      <Badge>
                        {parseFloat(userData.targetWeight) > parseFloat(userData.weight) ? '+' : ''}
                        {(parseFloat(userData.targetWeight) - parseFloat(userData.weight)).toFixed(1)} кг
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <Calendar className="size-3 inline mr-1" />
                      Примерное время: {Math.abs(Math.round((parseFloat(userData.targetWeight) - parseFloat(userData.weight)) / 0.5))} недель
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
              <Save className="size-5 mr-2" />
              Сохранить профиль
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
