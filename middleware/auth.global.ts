
export default defineNuxtRouteMiddleware((to, from) => {
    const { status } = useAuthState()
    // Return immeadiatly if user is already authenticated
    if (to.path != "/login" && status.value !== 'authenticated' ) {
        return navigateTo('/login')
    }
    else if (to.path == "/login" && status.value === 'authenticated')
        return navigateTo('/')
})