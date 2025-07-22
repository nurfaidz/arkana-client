export const authRoutes = [
    {
        path: '/auth',
        name: 'auth',
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/auth/Login.vue'),
                meta: {
                    requiresGuest: true,
                    title: 'Login'
                }
            }
        ]
    }
];