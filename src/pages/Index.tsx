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

interface Supplier {
  id: string;
  name: string;
  logo: string;
  rating: number;
  stock: number;
  prices: {
    retail: number;
    wholesale: number;
    withNds: number;
    withoutNds: number;
  };
  minOrder: number;
  delivery: {
    time: string;
    cost: number;
  };
}

interface CartItem {
  supplierId: string;
  modelId: string;
  quantity: number;
  price: number;
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

const suppliers: Supplier[] = [
  {
    id: 'netlab',
    name: 'NETLAB',
    logo: '🖥️',
    rating: 4.8,
    stock: 27,
    prices: {
      retail: 263805.77,
      wholesale: 233456.43,
      withNds: 394384.50,
      withoutNds: 394384.50
    },
    minOrder: 1,
    delivery: {
      time: '1-2 дня',
      cost: 0
    }
  },
  {
    id: 'ocs',
    name: 'OCS',
    logo: '⚡',
    rating: 4.6,
    stock: 20,
    prices: {
      retail: 283805.77,
      wholesale: 273456.43,
      withNds: 294384.50,
      withoutNds: 294384.50
    },
    minOrder: 1,
    delivery: {
      time: '2-3 дня',
      cost: 500
    }
  },
  {
    id: 'techno',
    name: 'TechnoMarket',
    logo: '🔧',
    rating: 4.4,
    stock: 15,
    prices: {
      retail: 275000,
      wholesale: 260000,
      withNds: 300000,
      withoutNds: 300000
    },
    minOrder: 2,
    delivery: {
      time: '3-5 дней',
      cost: 800
    }
  }
];

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<string>('air-m2');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const currentModel = models.find(m => m.id === selectedModel);

  const addToCart = (supplierId: string, quantity: number = 1) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;
    
    const existingItem = cart.find(item => 
      item.supplierId === supplierId && item.modelId === selectedModel
    );
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.supplierId === supplierId && item.modelId === selectedModel
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        supplierId,
        modelId: selectedModel,
        quantity,
        price: supplier.prices.wholesale
      }]);
    }
  };

  const removeFromCart = (supplierId: string) => {
    setCart(cart.filter(item => 
      !(item.supplierId === supplierId && item.modelId === selectedModel)
    ));
  };

  const updateCartQuantity = (supplierId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(supplierId);
      return;
    }
    
    setCart(cart.map(item =>
      item.supplierId === supplierId && item.modelId === selectedModel
        ? { ...item, quantity }
        : item
    ));
  };

  const getCartQuantity = (supplierId: string) => {
    const item = cart.find(item => 
      item.supplierId === supplierId && item.modelId === selectedModel
    );
    return item ? item.quantity : 0;
  };

  const getTotalCartValue = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
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

        {/* Model Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Выбор модели</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCart(!showCart)}
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина ({getTotalCartItems()})
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {models.map((model) => (
                <Card 
                  key={model.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedModel === model.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedModel(model.id)}
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
                          от {formatPrice(Math.min(...suppliers.map(s => s.prices.wholesale)))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {model.specs.processor} • {model.specs.memory} • {model.specs.storage}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Поставщики</CardTitle>
            <p className="text-sm text-gray-600">Выберите поставщика для модели {currentModel?.name}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-medium">Поставщик</th>
                    <th className="text-center p-3 font-medium">Остаток</th>
                    <th className="text-center p-3 font-medium">Цена опт</th>
                    <th className="text-center p-3 font-medium">НДС %</th>
                    <th className="text-center p-3 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => {
                    const cartQuantity = getCartQuantity(supplier.id);
                    return (
                      <tr key={supplier.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{supplier.logo}</span>
                            <div>
                              <div className="font-semibold">{supplier.name}</div>
                              <div className="text-xs text-gray-500">
                                ⭐ {supplier.rating} • {supplier.delivery.time}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={supplier.stock > 10 ? 'default' : 'destructive'}>
                            {supplier.stock} шт.
                          </Badge>
                        </td>
                        <td className="p-3 text-center font-semibold text-blue-600">
                          {formatPrice(supplier.prices.wholesale)}
                        </td>
                        <td className="p-3 text-center">20%</td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            {cartQuantity > 0 ? (
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateCartQuantity(supplier.id, cartQuantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="mx-2 min-w-[20px] text-center">{cartQuantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateCartQuantity(supplier.id, cartQuantity + 1)}
                                  disabled={cartQuantity >= supplier.stock}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm"
                                onClick={() => addToCart(supplier.id)}
                                disabled={supplier.stock === 0}
                              >
                                <Icon name="Plus" size={14} className="mr-1" />
                                Добавить
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart */}
        {showCart && cart.length > 0 && (
          <Card className="animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Корзина</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCart(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => {
                  const supplier = suppliers.find(s => s.id === item.supplierId);
                  const model = models.find(m => m.id === item.modelId);
                  return (
                    <div key={`${item.supplierId}-${item.modelId}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{supplier?.logo}</span>
                        <div>
                          <div className="font-semibold text-sm">{model?.name}</div>
                          <div className="text-xs text-gray-600">{supplier?.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.quantity} шт.</span>
                        <span className="font-semibold text-blue-600">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFromCart(item.supplierId)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-blue-600">{formatPrice(getTotalCartValue())}</span>
                </div>
                
                <Button className="w-full" size="lg">
                  Оформить заказ ({getTotalCartItems()} товаров)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <div className="lg:col-span-2">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="description">Описание</TabsTrigger>
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


        </Tabs>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Index;