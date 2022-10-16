import layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工' }
    },
    {
      path: '/employees/detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true
    },
    {
      path: '/employees/print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true
    }
  ]
}
