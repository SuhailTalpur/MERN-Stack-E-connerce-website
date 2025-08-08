import React from "react";
import Header from "../components/header";
import Category from "../components/category";
import TrendingProducts from "../components/trendingproducts";
import Reviews from "../components/reviews";
import Content from "../components/content";
import NewArrival from "../components/newarrival";


function Home() {
    return (
        <div>
            <Header />
            <Category />
            <TrendingProducts />
            <NewArrival />
            <Reviews />
            <Content />
        </div>
    )
}

export default Home;