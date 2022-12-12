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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
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

        const AboutUs = () => {
            return (
                <About
                    leaders={this.props.leaders.leaders}
                    isLoading={this.props.leaders.isLoading}
                    isErrMess={this.props.leaders.errMess}
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

        return (
            <div>
                <Header />
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
                            <Route exact path="/aboutus" component={AboutUs} />
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
