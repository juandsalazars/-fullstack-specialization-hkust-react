import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';
import DishDetail from './DishdetailComponent';

class Main extends Component {

    constructor (props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }
    }

    render () {

        const HomePage = () => {
            return(
                <Home
                    dish={this.state.dishes.find((dish) => dish.featured)}
                    promotion={this.state.promotions.find((promotion) => promotion.featured)}
                    leader={this.state.leaders.find((leader) => leader.featured)}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return(
                <DishDetail
                    dish={this.state.dishes.find(
                        (dish) => dish.id === Number(match.params.dishId)
                    )}

                    comments={this.state.comments.filter(
                        (comment) => comment.dishId === Number(match.params.dishId)
                    )}
                />
            );
        }

        return (
            <div>
                <Header />
                <React.StrictMode>
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route exact path="/contactus" component={Contact} />
                        <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders}/>} />
                        <Redirect to="/home" />
                    </Switch>
                    <Footer />
                </React.StrictMode>
            </div>
        );
    }
}

export default Main;
