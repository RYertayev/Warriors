import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я ваш AI-помощник по питанию и здоровому образу жизни. Расскажите мне о вашем рационе, режиме питания или задайте любой вопрос о здоровье!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Анализ различных запросов
    if (lowerMessage.includes('завтрак') || lowerMessage.includes('утро')) {
      return 'Отличный вопрос о завтраке! Рекомендую начинать день с:\n\n• Овсяная каша с орехами и ягодами (320-380 ккал)\n• Яичница из 2-3 яиц с овощами (250-300 ккал)\n• Греческий йогурт с мёдом и фруктами (200-250 ккал)\n\nЗавтрак должен составлять 25-30% вашей дневной калорийности. Не пропускайте его - это запускает метаболизм!';
    }
    
    if (lowerMessage.includes('обед')) {
      return 'Идеальный обед должен быть самым питательным приёмом пищи:\n\n• Белок: куриная грудка, рыба или бобовые (150-200г)\n• Сложные углеводы: гречка, киноа или бурый рис (100-150г)\n• Овощи: салат или тушёные овощи (200г)\n\nОбщая калорийность: 450-600 ккал. Это 35-40% дневного рациона.';
    }

    if (lowerMessage.includes('ужин') || lowerMessage.includes('вечер')) {
      return 'Вечером важно есть лёгкую, но питательную пищу:\n\n• Запечённая рыба с овощами (300-350 ккал)\n• Куриная грудка с салатом (280-320 ккал)\n• Творог с зеленью (200-250 ккал)\n\nУжин должен быть за 2-3 часа до сна. Избегайте тяжёлых углеводов вечером!';
    }

    if (lowerMessage.includes('вода') || lowerMessage.includes('пить')) {
      return 'Питьевой режим критически важен!\n\n💧 Рекомендации:\n• Минимум 2 литра воды в день\n• 250мл сразу после пробуждения\n• Стакан воды за 30 мин до еды\n• Больше воды во время тренировок\n\nВода ускоряет метаболизм на 30% и помогает контролировать аппетит!';
    }

    if (lowerMessage.includes('похудеть') || lowerMessage.includes('вес') || lowerMessage.includes('диета')) {
      return 'Для здорового снижения веса:\n\n1. Дефицит калорий 300-500 ккал/день\n2. Больше белка (1.5-2г на кг веса)\n3. 4-5 приёмов пищи в день\n4. Регулярные тренировки 3-4 раза в неделю\n5. Качественный сон 7-8 часов\n\nБезопасная скорость: 0.5-1 кг в неделю. Не голодайте!';
    }

    if (lowerMessage.includes('тренировк') || lowerMessage.includes('спорт') || lowerMessage.includes('зал')) {
      return 'Питание и тренировки - это единое целое!\n\n🏋️ Перед тренировкой (за 1-2 часа):\n• Сложные углеводы + немного белка\n• Банан с арахисовым маслом\n• Овсянка с фруктами\n\n💪 После тренировки (в течение 30-60 мин):\n• Белок + быстрые углеводы\n• Протеиновый коктейль\n• Куриная грудка с рисом';
    }

    if (lowerMessage.includes('калори') || lowerMessage.includes('ккал')) {
      return 'Расчёт калорий зависит от ваших целей:\n\n📊 Базовые формулы:\n• Поддержание веса: вес(кг) × 30-35 ккал\n• Похудение: вес(кг) × 25-30 ккал\n• Набор массы: вес(кг) × 35-40 ккал\n\nНапример, для человека 70кг:\n• Поддержание: 2100-2450 ккал\n• Похудение: 1750-2100 ккал\n• Набор: 2450-2800 ккал';
    }

    if (lowerMessage.includes('белок') || lowerMessage.includes('протеин')) {
      return 'Белок - основа здорового питания!\n\n🥩 Суточная норма:\n• Обычный режим: 1г на 1кг веса\n• Активные тренировки: 1.5-2г на 1кг\n• Для 70кг: 70-140г белка/день\n\n✅ Лучшие источники:\n• Куриная грудка (23г на 100г)\n• Творог (18г на 100г)\n• Рыба (20-25г на 100г)\n• Яйца (13г на 100г)';
    }

    if (lowerMessage.includes('углевод')) {
      return 'Углеводы - это энергия!\n\n⚡ Выбирайте сложные углеводы:\n• Овсянка, гречка, киноа\n• Бурый рис, макароны из твёрдых сортов\n• Овощи, фрукты, бобовые\n\n❌ Ограничьте простые:\n• Белый хлеб, сладости\n• Газировка, соки из пакетов\n\nНорма: 40-50% от общей калорийности';
    }

    if (lowerMessage.includes('жир')) {
      return 'Полезные жиры необходимы!\n\n🥑 Хорошие жиры:\n• Авокадо, орехи, семена\n• Оливковое и льняное масло\n• Жирная рыба (лосось, скумбрия)\n• Яичные желтки\n\nНорма: 25-30% от общей калорийности\n(0.8-1г на 1кг веса)';
    }

    if (lowerMessage.includes('витамин') || lowerMessage.includes('добавк')) {
      return 'Витамины и добавки:\n\n💊 Базовые добавки:\n• Витамин D3 (особенно зимой)\n• Омега-3 (если мало рыбы)\n• Магний (для сна и восстановления)\n• Витамин B12 (для вегетарианцев)\n\nНо помните: добавки дополняют, но не заменяют полноценное питание!';
    }

    if (lowerMessage.includes('перекус') || lowerMessage.includes('снек')) {
      return 'Здоровые перекусы между основными приёмами:\n\n🍎 Варианты (150-200 ккал):\n• Яблоко + 30г орехов\n• Греческий йогурт с ягодами\n• Морковь с хумусом\n• Протеиновый батончик\n• Творог с фруктами\n\nПерекусывайте каждые 3-4 часа для стабильного метаболизма!';
    }

    // Общий ответ
    return 'Спасибо за вопрос! Я могу помочь вам с:\n\n✓ Планированием рациона\n✓ Подсчётом калорий и БЖУ\n✓ Рекомендациями по питанию до/после тренировок\n✓ Советами по здоровому похудению или набору массы\n✓ Информацией о витаминах и добавках\n\nЗадайте более конкретный вопрос, и я дам детальный ответ!';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Симулируем задержку ответа бота
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'Что есть на завтрак?',
    'Как правильно питаться?',
    'Сколько белка нужно?',
    'Как похудеть?'
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-full">
            <Bot className="size-8" />
          </div>
          <div>
            <h1 className="text-2xl">AI Консультант</h1>
            <p className="text-blue-100 text-sm flex items-center gap-2">
              <Sparkles className="size-4" />
              Анализ питания и образа жизни
            </p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-4 bg-white border-b">
          <p className="text-sm text-gray-600 mb-3">Быстрые вопросы:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(question);
                }}
                className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${
                message.sender === 'bot' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-green-600 text-white'
              }`}>
                {message.sender === 'bot' ? (
                  <Bot className="size-5" />
                ) : (
                  <UserIcon className="size-5" />
                )}
              </div>
              
              <Card className={`max-w-[75%] px-4 py-3 ${
                message.sender === 'user' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white'
              }`}>
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {message.text}
                </p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 size-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="size-5" />
              </div>
              <Card className="px-4 py-3 bg-white">
                <div className="flex gap-1">
                  <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите ваш вопрос о питании..."
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
