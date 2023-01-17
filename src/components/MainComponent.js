import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes,
    fetchComments, fetchPromos, fetchLeaders, loginUser,
    logoutUser, fetchFavorites, postFavorite,
    deleteFavorite } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
        return {
            dishes: state.dishes,
            comments: state.comments,
            leaders: state.leaders,
            promotions: state.promotions,
            favorites: state.favorites,
            auth: state.auth
        }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFavorites();
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

                    leader={this.props.leaders.leaders.find((leader) => leader.featured)}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return(
                this.props.auth.isAuthenticated
                && this.props.favorites.favorites
                && 'dishes' in this.props.favorites.favorites
                ?
                <DishDetail
                    dish={this.props.dishes.dishes.find(
                        (dish) => dish._id === match.params.dishId
                    )}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}

                    comments={this.props.comments.comments.filter(
                        (comment) => comment.dish === match.params.dishId
                    )}
                    commentsLoading={this.props.comments.isLoading}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}

                    favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
                    postFavorite={this.props.postFavorite}
                    deleteFavorite={this.props.deleteFavorite}
                />
                :
                <DishDetail
                    dish={this.props.dishes.dishes.find(
                        (dish) => dish._id === match.params.dishId
                    )}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}

                    comments={this.props.comments.comments.filter(
                        (comment) => comment.dish === match.params.dishId
                    )}
                    commentsLoading={this.props.comments.isLoading}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}

                    favorite={false}
                    postFavorite={this.props.postFavorite}
                    deleteFavorite={this.props.deleteFavorite}
                />
            );
        }

        const ContactUs = () => {
            return(
                <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                />
            );
        }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest}
                render={(props) => (
                    this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        return (
            <div>
                <Header 
                    auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} 
                />
                <TransitionGroup>
                    <CSSTransition
                        key={this.props.location.key}
                        classNames="page"
                        timeout={300}
                    >
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contactus" component={ContactUs} />
                            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                            <PrivateRoute exact path="/favorites" component={
                                    () => <Favorites
                                        favorites={this.props.favorites}
                                        deleteFavorite={this.props.deleteFavorite}
                                    />
                                }
                            />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
