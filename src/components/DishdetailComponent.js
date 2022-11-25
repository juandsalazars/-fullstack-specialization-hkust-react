import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

function RenderDish({ dish }) {

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

function RenderComments({ comments }) {

    const commentList = comments.map((comment) => {
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
                {commentList}
            </ul>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish === null || props.dish === undefined) return (<div></div>);

    return(
        <div className="container">
            <div className="row">

                <RenderDish dish={props.dish} />

                <RenderComments comments={props.dish.comments} />

            </div>
        </div>
    );
}

export default DishDetail;