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
  warehouses: {
    name: string;
    stock: number;
    price: number;
  }[];
  priceTypes: {
    type: string;
    price: number;
    description: string;
  }[];
}

interface CartItem {
  supplierId: string;
  modelId: string;
  quantity: number;
  price: number;
}

const models: ProductModel[] = [
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
    },
    warehouses: [
      { name: 'склад transit', stock: 120, price: 233456.43 },
      { name: 'склад autoinstant', stock: 0, price: 233456.43 },
      { name: 'склад local', stock: 0, price: 233456.43 },
      { name: 'склад shipmentcity', stock: 0, price: 233456.43 },
      { name: 'склад reserve', stock: 0, price: 233456.43 },
      { name: 'склад transitco', stock: 0, price: 233456.43 },
      { name: 'склад internalmovemrent', stock: 0, price: 233456.43 }
    ],
    priceTypes: [
      { type: 'цена товара в прайслисте(rub)', price: 0, description: 'Основная цена' },
      { type: 'цена товара в прайслисте(usd)', price: 3979, description: 'Цена в долларах' },
      { type: 'цена товара в заказе(rub)', price: 394384.50, description: 'Оптовая цена' },
      { type: 'цена товара в заказе(usd)', price: 394384.50, description: 'Оптовая цена USD' },
      { type: 'рекомендованная производителем розничная цена(rub)', price: 0, description: 'РРЦ рубли' },
      { type: 'рекомендованная производителем розничная цена(usd)', price: 0, description: 'РРЦ доллары' },
      { type: 'рекомендованная розничная цена для онлайн-продаж(rub)', price: 0, description: 'Онлайн РРЦ рубли' },
      { type: 'рекомендованная розничная цена для онлайн-продаж(usd)', price: 0, description: 'Онлайн РРЦ доллары' }
    ]
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
    },
    warehouses: [
      { name: 'склад CO', stock: 10, price: 273456.43 },
      { name: 'склад local', stock: 0, price: 273456.43 },
      { name: 'склад shipmentcity', stock: 0, price: 273456.43 },
      { name: 'склад reserve', stock: 0, price: 273456.43 },
      { name: 'склад transitco', stock: 0, price: 273456.43 },
      { name: 'склад internalmovemrent', stock: 0, price: 273456.43 }
    ],
    priceTypes: [
      { type: 'цена товара в прайслисте(rub)', price: 2979, description: 'Основная цена' },
      { type: 'цена товара в прайслисте(usd)', price: 294384.50, description: 'Цена в долларах' },
      { type: 'цена товара в заказе(rub)', price: 294384.50, description: 'Оптовая цена' },
      { type: 'рекомендованная производителем розничная цена(rub)', price: 0, description: 'РРЦ рубли' },
      { type: 'рекомендованная производителем розничная цена(usd)', price: 0, description: 'РРЦ доллары' },
      { type: 'рекомендованная розничная цена для онлайн-продаж(rub)', price: 0, description: 'Онлайн РРЦ рубли' },
      { type: 'рекомендованная розничная цена для онлайн-продаж(usd)', price: 0, description: 'Онлайн РРЦ доллары' }
    ]
  }
];

const Index = () => {
  const selectedModel = 'air-m2'; // фиксированная модель
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [expandedSupplier, setExpandedSupplier] = useState<string | null>(null);

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
      <div className="max-w-md mx-auto space-y-6 lg:max-w-6xl">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0 space-y-6">
          
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 lg:col-span-3">
          <Icon name="Apple" size={32} />
          <h1 className="text-2xl font-bold text-gray-900">Apple</h1>
        </div>

        {/* Product Image & Basic Info */}
        <Card className="overflow-hidden animate-fade-in lg:col-span-1">
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
              <div className="text-sm text-gray-600 mb-4">
                {currentModel?.specs.processor} • {currentModel?.specs.memory} • {currentModel?.specs.storage}
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 animate-slide-up">
                <span className="text-lg text-gray-600">от</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(Math.min(...suppliers.map(s => s.prices.wholesale)))}
                </span>
              </div>
              <Badge variant="secondary" className="mb-4 animate-scale-in">
                В наличии у {suppliers.filter(s => s.stock > 0).length} поставщиков
              </Badge>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mb-4 animate-slide-up">
              <Button 
                variant="outline"
                className="flex-1 transition-all duration-200 hover:shadow-lg hover:scale-105"
                onClick={() => setShowCart(true)}
              >
                <Icon name="Eye" size={18} className="mr-2" />
                Посмотреть поставщиков
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

        {/* Suppliers Cards */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Поставщики товара</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCart(!showCart)}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина ({getTotalCartItems()})
            </Button>
          </div>
          
          {suppliers.map((supplier) => {
            const cartQuantity = getCartQuantity(supplier.id);
            const isExpanded = expandedSupplier === supplier.id;
            
            return (
              <Card key={supplier.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{supplier.logo}</span>
                      <div>
                        <h3 className="font-bold text-lg">{supplier.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>⭐ {supplier.rating}</span>
                          <span>🚚 {supplier.delivery.time}</span>
                          <Badge variant={supplier.stock > 10 ? 'default' : 'destructive'}>
                            {supplier.stock} шт.
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Цена опт</div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatPrice(supplier.prices.wholesale)}
                        </div>
                        <div className="text-xs text-gray-500">НДС 20%</div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedSupplier(isExpanded ? null : supplier.id)}
                      >
                        <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Мин. заказ: {supplier.minOrder} шт. • Доставка: {supplier.delivery.cost === 0 ? 'бесплатно' : formatPrice(supplier.delivery.cost)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {cartQuantity > 0 ? (
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateCartQuantity(supplier.id, cartQuantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="mx-2 min-w-[30px] text-center font-semibold">{cartQuantity}</span>
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
                          onClick={() => addToCart(supplier.id)}
                          disabled={supplier.stock === 0}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t animate-slide-up">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Типы цен */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Icon name="DollarSign" size={16} />
                            Типы цен
                          </h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {supplier.priceTypes.map((priceType, index) => (
                              <div key={index} className="flex justify-between items-start text-sm bg-gray-50 p-3 rounded">
                                <div className="flex-1 pr-2">
                                  <div className="text-gray-700 font-medium">{priceType.type}</div>
                                  <div className="text-xs text-gray-500 mt-1">{priceType.description}</div>
                                </div>
                                <span className="font-semibold text-blue-600">
                                  {priceType.price === 0 ? '0,00 ₽' : formatPrice(priceType.price)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Склады */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Icon name="Warehouse" size={16} />
                            Наличие по складам
                          </h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {supplier.warehouses.map((warehouse, index) => (
                              <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded">
                                <span className="text-gray-700 font-medium">{warehouse.name}</span>
                                <div className="flex items-center gap-2">
                                  <Badge variant={warehouse.stock > 0 ? 'default' : 'secondary'}>
                                    {warehouse.stock} шт.
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Shopping Cart */}
        {showCart && cart.length > 0 && (
          <Card className="animate-slide-up lg:col-span-3">
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
                    <div key={`${item.supplierId}-${item.modelId}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{supplier?.logo}</span>
                        <div>
                          <div className="font-semibold text-sm">{model?.name}</div>
                          <div className="text-xs text-gray-600">{supplier?.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
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
        <div className="lg:col-span-3">
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