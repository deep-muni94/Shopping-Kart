/**
 @author    Bharat Bhargava => B00838511
 **/

import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import '../CSS/ProductRating.css';
import AddReview from './AddReview'
import Axios from "axios";

let count = 0;
class ProductRating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        };
        this.totalRating = this.totalRating.bind(this)
        console.log(props)
    }

    async componentDidMount() {
        let id = this.props.productId + ""
        // To get reviews data from all users
        await Axios.get("https://csci-5709-web-24.herokuapp.com/review/getProductReview/" + id).then(
            res => {
                this.totalRating(res.data.data)
            }
        );

    }

    // To get total rating from the provided ratings by users
    totalRating(data) {
        let rate = 0;
        count = 0;
        for (let i = 0; i < data.length; i++) {
            rate = rate + data[i].productRating;
            count = count + 1;
        }
        let rating = parseFloat(rate / count).toFixed(1);
        // If no rating is available then set rating to zero
        rating = rating === "NaN" ? 0 : rating;
        this.setState({
            rating: rating
        });
    }
    render() {
        return (
            <div>
                <Container>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <div className="content text-center">
                                    <div className="ratings">
                                        <span className="product-rating">{this.state.rating}</span><span>/5</span>
                                        <div class="stars">
                                            <FontAwesomeIcon icon={faStar} style={{ "color": "orange" }} />
                                            <FontAwesomeIcon icon={faStar} style={{ "color": "orange" }} />
                                            <FontAwesomeIcon icon={faStar} style={{ "color": "orange" }} />
                                            <FontAwesomeIcon icon={faStar} style={{ "color": "orange" }} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </div>
                                        <div className="rating-text">
                                            <span>{count} ratings & {count} reviews</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="content text-center">
                                    <div className="ratings">
                                        <div className="text-center">
                                            <AddReview parentProps={this.props.parentProps} productId={this.props.productId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

        );
    }
}
export default ProductRating
