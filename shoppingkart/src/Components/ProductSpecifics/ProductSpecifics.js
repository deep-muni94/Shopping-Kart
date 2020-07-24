import React, {Component} from 'react';
import {Container, Table} from 'react-bootstrap';
import Axios from "axios";

class ProductSpecifics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetails: {}
        }
        this.addProductDetails = this.addProductDetails.bind(this)
    }

    async componentDidMount() {
        let id = this.props.productId + ""
        const productData = await Axios.get("http://localhost:5000/product/getProductDetails/" + id);
        this.setState({
            productDetails: productData.data.data[0].productDetails
        })
    }

    addProductDetails() {
        let rows = [];
        let detail = this.state.productDetails

        Object.keys(detail).map(function (key, index) {
            rows.push(
                <tr>
                    <td className="font-weight-bold">{key.trim().replace(/([A-Z])/g, ' $1').replace(/^./, function (word) {
                        return word.toUpperCase();
                    })
                    }</td>
                    <td>{detail[key].trim()}</td>
                </tr>
            )
        })
        return rows
    }

    render() {
        return (
            <div className=" mt-5">
                <Container>
                    <div className="container">
                        <div className="text-center">
                            <h2>Product details</h2>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <Table striped bordered hover>
                                    <tbody>
                                    {this.addProductDetails()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProductSpecifics;
