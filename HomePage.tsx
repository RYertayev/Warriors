import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Dumbbell, Heart, Apple, Clock, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

export default function HomePage() {
  const sportsTips = [
    {
      icon: <Dumbbell className="size-5 text-green-600" />,
      title: 'Начните с разминки',
      description: 'Всегда разминайтесь 5-10 минут перед тренировкой для предотвращения травм и улучшения производительности.'
    },
    {
      icon: <Clock className="size-5 text-blue-600" />,
      title: 'Регулярность важнее интенсивности',
      description: '3-4 тренировки в неделю по 30-45 минут эффективнее, чем одна изнурительная тренировка.'
    },
    {
      icon: <TrendingUp className="size-5 text-purple-600" />,
      title: 'Прогрессивная нагрузка',
      description: 'Постепенно увеличивайте вес и интенсивность тренировок для постоянного прогресса.'
    },
    {
      icon: <Users className="size-5 text-orange-600" />,
      title: 'Найдите партнёра',
      description: 'Тренировки с партнёром повышают мотивацию и помогают не пропускать занятия.'
    }
  ];

  const nutritionTips = [
    {
      icon: <Apple className="size-5 text-red-600" />,
      title: 'Баланс белков, жиров и углеводов',
      description: 'Оптимальное соотношение: 30% белков, 30% жиров, 40% углеводов для поддержания здоровья.'
    },
    {
      icon: <Heart className="size-5 text-pink-600" />,
      title: 'Пейте достаточно воды',
      description: 'Минимум 2 литра воды в день помогают метаболизму и общему самочувствию.'
    },
    {
      icon: <Clock className="size-5 text-indigo-600" />,
      title: 'Ешьте 4-5 раз в день',
      description: 'Частое питание небольшими порциями ускоряет обмен веществ и контролирует аппетит.'
    },
    {
      icon: <TrendingUp className="size-5 text-teal-600" />,
      title: 'Больше овощей и фруктов',
      description: 'Минимум 400г овощей и фруктов ежедневно обеспечивают витаминами и клетчаткой.'
    }
  ];

  const recipes = [
    {
      title: 'Овсяная каша с ягодами',
      category: 'Завтрак',
      time: '10 мин',
      calories: '320 ккал',
      image: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzY4NDE5NDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: ['50г овсяных хлопьев', '200мл молока', '100г свежих ягод', '1 ч.л. мёда'],
      description: 'Идеальный завтрак для энергии на весь день. Богат клетчаткой и антиоксидантами.'
    },
    {
      title: 'Куриная грудка с овощами',
      category: 'Обед',
      time: '25 мин',
      calories: '450 ккал',
      image: 'https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjgzNzQyODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: ['200г куриной грудки', '150г брокколи', '100г моркови', '1 ст.л. оливкового масла'],
      description: 'Сбалансированное блюдо с высоким содержанием белка и витаминов.'
    },
    {
      title: 'Греческий салат с киноа',
      category: 'Ужин',
      time: '15 мин',
      calories: '380 ккал',
      image: 'https://images.unsplash.com/photo-1750698544894-1f012e37e5e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXhlcmNpc2UlMjBneW18ZW58MXx8fHwxNzY4NDM2OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: ['100г киноа', '150г помидоров черри', '100г огурцов', '50г феты', '30г оливок'],
      description: 'Лёгкий, но питательный ужин с полезными жирами и растительным белком.'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-green-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl mb-2">Здоровый образ жизни</h1>
          <p className="text-green-100">Ваш путеводитель к здоровью и фитнесу</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Tips Section */}
        <Tabs defaultValue="sport" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sport">
              <Dumbbell className="size-4 mr-2" />
              Советы по спорту
            </TabsTrigger>
            <TabsTrigger value="nutrition">
              <Apple className="size-4 mr-2" />
              Правильное питание
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sport" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {sportsTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {tip.icon}
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {nutritionTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {tip.icon}
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recipes Section */}
        <div className="mt-12">
          <h2 className="text-2xl mb-6">Рецепты правильного питания</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <ImageWithFallback 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                    {recipe.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="size-4" />
                      <span>{recipe.calories}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mb-2">Ингредиенты:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="size-1.5 bg-green-600 rounded-full"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
