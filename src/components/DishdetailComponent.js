import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail extends Component {

    render() {
        if (this.props.dish === null || this.props.dish === undefined) return (<div></div>);

        return(
            <div className="container">
                <div className="row">

                    {this.renderDish(this.props.dish)}

                    {this.renderComments(this.props.dish)}

                </div>
            </div>
        );
    }

    renderDish(dish) {
        if (dish === null || dish === undefined) return (<div></div>);

        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} /> 
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(dish) {
        if (dish === null || dish === undefined) return (<div></div>);

        const commentList = dish.comments

        const comments = commentList.map((comment) => {
            const date = new Date(comment.date);
            const [month, day, year] = [date.toString().slice(4,7), date.getDate(), date.getFullYear()];

            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                        <span>-- {comment.author}, {month} {day}, {year}</span>
                    </p>
                </li>
            );
        });

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments}
                </ul>
            </div>
        );
    }
}

export default DishDetail;