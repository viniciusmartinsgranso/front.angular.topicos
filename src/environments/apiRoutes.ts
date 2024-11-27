export const apiRoutes = {
  auth: {
    login: '/auth/login'
  },
  users: {
    create: '/users',
    getMany: '/users',
    me: '/user/me',
    update: '/users/{id}',
    one: '/users/{id}',
  },
  category: {
    create: '/category',
    update: '/category/{id}',
    deactivate: '/category/deactivate/{id}',
    activate: '/category/activate/{id}',
    one: '/category/{id}',
    getMany: '/category',
    getManyByIds: '/category/ids/{ids}',
  },
  pizzas: {
    create: '/pizzas',
    getMany: '/pizzas',
    updateOne: '/pizzas/{id}',
    getOne: '/pizzas/{id}',
    activate: '/pizzas/activate/{id}',
    deactivate: '/pizzas/deactivate/{id}',
  },
  media: {
    create: '/media'
  },
  tables: {
    getMany: '/tables',
    create: '/tables',
    deactivate: '/tables/deactivate/{id}',
    activate: '/tables/activate/{id}',
  },
  drinks: {
    create: '/drinks',
    getMany: '/drinks',
    getOne: '/drinks/{id}',
    update: '/drinks/{id}',
    deactivate: '/drinks/deactivate/{id}',
    activate: '/drinks/activate/{id}',
  },
  orders: {
    create: '/orders',
    getMany: '/orders',
    finish: '/finish/{id}'
  }
}
