import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
        return {
            dishes: state.dishes,
            comments: state.comments,
            leaders: state.leaders,
            promotions: state.promotions
        }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())}
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render () {

        const HomePage = () => {
            return(
                <Home
                    dish={this.props.dishes.dishes.find((dish) => dish.featured)}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.find((promotion) => promotion.featured)}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.find((leader) => leader.featured)}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return(
                <DishDetail
                    dish={this.props.dishes.dishes.find(
                        (dish) => dish.id === Number(match.params.dishId)
                    )}

                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}

                    comments={this.props.comments.comments.filter(
                        (comment) => comment.dishId === Number(match.params.dishId)
                    )}

                    commentsLoading={this.props.comments.isLoading}
                    commentsErrMess={this.props.comments.errMess}

                    postComment={this.props.postComment}
                />
            );
        }

        return (
            <div>
                <Header />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                        <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
                        <Redirect to="/home" />
                    </Switch>
                    <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
