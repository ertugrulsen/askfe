import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import constant from '../library/constants/constants'
import Home from '../views/pages/home/Home'
import DefaultLayout from '../views/layouts/default-layout'

Vue.use(VueRouter)

function lazyLoad(view){
  return() => import(`../views/pages/${view}/${view}.vue`)
}
function lazyLoadByModuleAndPage(moduleName, pageName){
  return() => import(`../views/pages/${moduleName}/${pageName}.vue`)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: lazyLoad('login')
  },
  {
    path: '/register',
    name: 'Register',
    component: lazyLoad('register')
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          carosel:true
        }
      },
      {
        path: '/askQuestion',
        name: 'AskQuestion',
        component: lazyLoad('askQuestion'),
        meta: {
          needUser:true,
          carosel:false
        }
      },
      {
        path: '/questionDetail',
        name: 'QuestionDetail',
        component: lazyLoad('questionDetail'),
        meta: {
          carosel:false
        }
      },
      {
        path: '/search',
        name: 'Search',
        component: lazyLoad('search'),
        meta: {
          carosel:false
        }
      },
      {
        path: '/logout',
        name: 'Logout',
        component: lazyLoad('logout'),
        meta: {
        }
      },
      // otherwise redirect to home
      { path: '*', redirect: '/' }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const { needUser } = to.meta
  const currentUser = store.getters.currentUser
  
  if (needUser === true && !currentUser.UserName) {
    return next({ path: '/login', query: { returnUrl: to.path } })
  }
  next()
})

export default router
