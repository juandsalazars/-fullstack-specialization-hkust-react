import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.dish === null) return (<div></div>);

        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>

                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
        );
    }

    renderDish(dish) {
        if (dish === null) return (<div></div>);

        return(
            <div>
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

    renderComments(commentList) {
        if (commentList === null) return (<div></div>);

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
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments}
                </ul>
            </div>
        );
    }
}

export default DishDetail;