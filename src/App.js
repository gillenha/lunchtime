import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Drawer from "./Components/Drawer/Drawer";
import Restaurant from "./Components/Restaurant/Restaurant";
import gradient from "./Images/cellGradientBackground@2x.png";

const API =
  "http://sandbox.bottlerocketapps.com/BR_iOS_CodingExam_2015_Server/restaurants.json";

class App extends Component {
  state = {
    restaurants: [],
    isLoading: false,
    error: null,
    visible: false,
    restaurant: {}
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(API)
      .then(result =>
        this.setState({
          restaurants: result.data.restaurants,
          isLoading: false
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  openDrawer = restaurant => {
    console.log("openDrawer!");
    // const restaurants = [...this.state.restaurants];
    // const index = restaurants.indexOf(restaurant);
    // restaurants[index] = { ...restaurant };
    // restaurants[index].isOpen = true;
    this.setState({
      restaurant,
      visible: true
    });
  };

  closeDrawer = restaurant => {
    console.log("closeDrawer!");
    // const restaurants = [...this.state.restaurants];
    // const index = restaurants.indexOf(restaurant);
    // restaurants[index] = { ...restaurant };
    // restaurants[index].isOpen = false;
    this.setState({
      retaurant: {},
      visible: false
    });
  };

  create2dArray = () => {
    let content = [];
    const restaurants = [...this.state.restaurants];
    restaurants.forEach((r, i) => {
      if (i === restaurants.length - 1) {
        content.push([restaurants[i]]);
      } else if ((i + 1) % 2 === 0) {
        content.push([restaurants[i - 1], restaurants[i]]);
      }
    });
    return content;
  };

  renderList = () => {
    let result = [];
    const restaurants = this.state.restaurants;
    result = restaurants.map(r => {
      return (
        <div key={r.name} className="list">
          <Restaurant
            restaurant={r}
            imgUrl={r.backgroundImageURL}
            name={r.name}
            category={r.category}
            gradient={gradient}
            openDrawer={this.openDrawer}
          />
        </div>
      );
    });
    return result;
  };

  render() {
    const { visible, isLoading, restaurant } = this.state;
    const restaurants = this.create2dArray(this.state.restaurants);

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <Drawer
          restaurant={restaurant}
          visible={visible}
          onCloseDrawer={this.closeDrawer}
        />
        <div>
          <div className="title-home">Lunch Tyme</div>
        </div>
        <div className="card-container">
          {restaurants.map((arr, index) => {
            return (
              <div key={index} className="cardRow">
                <div className={arr[1] && "restaurant-card"}>
                  <Restaurant
                    restaurant={arr[0]}
                    gradient={gradient}
                    openDrawer={this.openDrawer}
                  />
                </div>
                {arr[1] && (
                  <div className="restaurant-card">
                    <Restaurant
                      restaurant={arr[1]}
                      gradient={gradient}
                      openDrawer={this.openDrawer}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
