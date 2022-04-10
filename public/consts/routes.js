export const routes = {
    homePage: "/",
    collectionsPage: "/collections",
    singleCollectionsPage: "/collections/\\d+",
    profilePage: "/profile",
    loginPage: "/login",
    registrationPage: "/register",
}

export const regularRoutes = {
    homePage: "^/$",
    collectionsPage: "^/collections$",    
    loginPage:  "^/login",
    registrationPage: "^/register",
    singleCollectionPage:"^/collections/\\d+$",    
    moviePage:"^/movie/\\d+$",
    profilePage:"^/profile/\\d+$",
}
