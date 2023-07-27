declare interface Vendor {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

declare interface Equipment {
  id: string;
  name: string;
  image: string;
  description: string;
  countInStock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  vendor: Vendor;
}

declare interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  telephone: number;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

declare interface OrderDetail {
  id: string;
  userId: string;
  user: User;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

declare interface OrderItem {
  id: string;
  orderId: string;
  order: OrderDetail;
  equipmentId: string;
  equipment: Equipment;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

declare interface Cart extends Equipment {
  quantity: number;
}
