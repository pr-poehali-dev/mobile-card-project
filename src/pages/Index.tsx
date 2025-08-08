import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProductModel {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  specs: {
    processor: string;
    memory: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
    weight: string;
  };
  features: string[];
}

const models: ProductModel[] = [
  {
    id: 'air-m1',
    name: 'MacBook Air M1',
    price: 99990,
    originalPrice: 119990,
    specs: {
      processor: 'Apple M1 (8 ядер)',
      memory: '8 ГБ',
      storage: '256 ГБ SSD',
      display: '13.3" Retina',
      graphics: 'Встроенная 7-ядерная',
      battery: 'До 18 часов',
      weight: '1.29 кг'
    },
    features: ['Touch ID', 'Magic Keyboard', 'Force Touch трекпад', 'Thunderbolt 3']
  },
  {
    id: 'air-m2',
    name: 'MacBook Air M2',
    price: 129990,
    originalPrice: 149990,
    specs: {
      processor: 'Apple M2 (8 ядер)',
      memory: '8 ГБ',
      storage: '256 ГБ SSD',
      display: '13.6" Liquid Retina',
      graphics: 'Встроенная 8-ядерная',
      battery: 'До 20 часов',
      weight: '1.24 кг'
    },
    features: ['Touch ID', 'Magic Keyboard', 'MagSafe 3', 'Thunderbolt 4']
  },
  {
    id: 'pro-m3',
    name: 'MacBook Pro M3',
    price: 199990,
    specs: {
      processor: 'Apple M3 (8 ядер)',
      memory: '16 ГБ',
      storage: '512 ГБ SSD',
      display: '14" Liquid Retina XDR',
      graphics: 'Встроенная 10-ядерная',
      battery: 'До 22 часов',
      weight: '1.55 кг'
    },
    features: ['Touch ID', 'Magic Keyboard', 'MagSafe 3', 'Thunderbolt 4', 'HDMI', 'SDXC']
  }
];

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<string>('air-m2');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareModels, setCompareModels] = useState<string[]>(['air-m1', 'air-m2']);

  const currentModel = models.find(m => m.id === selectedModel);

  const toggleCompareModel = (modelId: string) => {
    if (compareModels.includes(modelId)) {
      setCompareModels(compareModels.filter(id => id !== modelId));
    } else if (compareModels.length < 3) {
      setCompareModels([...compareModels, modelId]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6 lg:max-w-4xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 lg:col-span-2">
          <Icon name="Apple" size={32} />
          <h1 className="text-2xl font-bold text-gray-900">Apple</h1>
        </div>

        {/* Product Image & Basic Info */}
        <Card className="overflow-hidden animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="group overflow-hidden rounded-lg mb-4">
                <img 
                  src="/img/629f2efa-b8a4-40f3-84ca-ffb80cd8ddf8.jpg" 
                  alt="MacBook Air"
                  className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 animate-slide-up">
                {currentModel?.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4 animate-slide-up">
                {currentModel?.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(currentModel.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-600">
                  {currentModel && formatPrice(currentModel.price)}
                </span>
              </div>
              <Badge variant="secondary" className="mb-4 animate-scale-in">
                В наличии
              </Badge>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mb-4 animate-slide-up">
              <Button className="flex-1 transition-all duration-200 hover:shadow-lg hover:scale-105">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Купить
              </Button>
              <Button variant="outline" size="icon" className="transition-all duration-200 hover:scale-110 hover:text-red-500">
                <Icon name="Heart" size={18} />
              </Button>
              <Button variant="outline" size="icon" className="transition-all duration-200 hover:scale-110">
                <Icon name="Share" size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Model Selection & Compare Toggle */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Выбор модели</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCompareMode(!compareMode)}
              >
                <Icon name="GitCompare" size={16} className="mr-2" />
                {compareMode ? 'Закрыть' : 'Сравнить'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {models.map((model) => (
                <div key={model.id} className="flex items-center gap-3">
                  {compareMode && (
                    <input
                      type="checkbox"
                      checked={compareModels.includes(model.id)}
                      onChange={() => toggleCompareModel(model.id)}
                      className="rounded border-gray-300"
                    />
                  )}
                  <Card 
                    className={`flex-1 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedModel === model.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => !compareMode && setSelectedModel(model.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{model.name}</h3>
                        <div className="text-right">
                          {model.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(model.originalPrice)}
                            </div>
                          )}
                          <div className="font-bold text-blue-600">
                            {formatPrice(model.price)}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {model.specs.processor} • {model.specs.memory} • {model.specs.storage}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {compareMode && compareModels.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Сравнение моделей</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Характеристика</th>
                      {compareModels.map(modelId => {
                        const model = models.find(m => m.id === modelId);
                        return (
                          <th key={modelId} className="text-center p-2 font-medium min-w-[100px]">
                            {model?.name.split(' ').slice(-1)}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(models[0].specs).map(([key, _]) => (
                      <tr key={key} className="border-b">
                        <td className="p-2 font-medium capitalize">
                          {key === 'processor' && 'Процессор'}
                          {key === 'memory' && 'Память'}
                          {key === 'storage' && 'Накопитель'}
                          {key === 'display' && 'Дисплей'}
                          {key === 'graphics' && 'Графика'}
                          {key === 'battery' && 'Батарея'}
                          {key === 'weight' && 'Вес'}
                        </td>
                        {compareModels.map(modelId => {
                          const model = models.find(m => m.id === modelId);
                          return (
                            <td key={`${modelId}-${key}`} className="p-2 text-center text-xs">
                              {model?.specs[key as keyof typeof model.specs]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr>
                      <td className="p-2 font-medium">Цена</td>
                      {compareModels.map(modelId => {
                        const model = models.find(m => m.id === modelId);
                        return (
                          <td key={`${modelId}-price`} className="p-2 text-center text-xs font-semibold text-blue-600">
                            {model && formatPrice(model.price)}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <div className="lg:col-span-2">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="buy">Покупка</TabsTrigger>
          </TabsList>

          {/* Technical Specifications */}
          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Технические характеристики</CardTitle>
              </CardHeader>
              <CardContent>
                {currentModel && (
                  <div className="space-y-4">
                    {Object.entries(currentModel.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600 capitalize">
                          {key === 'processor' && 'Процессор'}
                          {key === 'memory' && 'Оперативная память'}
                          {key === 'storage' && 'Накопитель'}
                          {key === 'display' && 'Дисплей'}
                          {key === 'graphics' && 'Графический процессор'}
                          {key === 'battery' && 'Автономность'}
                          {key === 'weight' && 'Вес'}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h4 className="font-semibold mb-3">Особенности</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentModel.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product Description */}
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Описание товара</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="performance">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Icon name="Zap" size={18} />
                        Производительность
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">
                        Чип {currentModel?.specs.processor} обеспечивает невероятную производительность 
                        для повседневных задач и профессиональной работы. Энергоэффективная архитектура 
                        гарантирует длительное время автономной работы.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="display">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Icon name="Monitor" size={18} />
                        Дисплей
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">
                        {currentModel?.specs.display} дисплей с широкой цветовой гаммой P3 
                        и яркостью 500 нит обеспечивает точную передачу цветов и комфортную работу 
                        в любых условиях освещения.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="design">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Icon name="Palette" size={18} />
                        Дизайн
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">
                        Ультратонкий корпус из алюминия весом всего {currentModel?.specs.weight} 
                        сочетает в себе прочность и элегантность. Доступен в четырех изысканных цветах.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase Options */}
          <TabsContent value="buy">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Варианты покупки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Единовременная оплата</span>
                        <span className="text-xl font-bold text-blue-600">
                          {currentModel && formatPrice(currentModel.price)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Полная стоимость товара. Бесплатная доставка.
                      </p>
                      <Button className="w-full mt-3">
                        Купить сейчас
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Рассрочка 0%</span>
                        <span className="text-lg font-bold">
                          {currentModel && formatPrice(Math.round(currentModel.price / 12))} × 12 мес.
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Без переплат и первоначального взноса.
                      </p>
                      <Button variant="outline" className="w-full mt-3">
                        Оформить рассрочку
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Trade-in</span>
                        <span className="text-green-600 font-semibold">
                          Скидка до 50 000 ₽
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Сдайте старое устройство и получите скидку на новое.
                      </p>
                      <Button variant="outline" className="w-full mt-3">
                        Узнать стоимость
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon name="Truck" size={18} />
                    <span>Бесплатная доставка</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                    <Icon name="Shield" size={18} />
                    <span>Гарантия 1 год</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                    <Icon name="RotateCcw" size={18} />
                    <span>Возврат 14 дней</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Index;