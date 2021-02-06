import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-credit-cards/es/styles-compiled.css';

import { Navbar, Button, Form, Nav, NavDropdown } from 'react-bootstrap';
import Book from './Book';
import ReactPaginate from 'react-paginate'
import Pagination from "react-js-pagination";
import CartItem from './CartItem';
import PaymentForm from './Payment/PaymentForm';



class Home extends Component {
    state = {
        rawData: [],
        keyword: "",
        selectedPage: 1,
        PER_PAGE: 10,
        currentPage: 0,
        offset: 0,
        pageCount: 50,
        sort: "no",
        arrayLength: 0,
        cart: [],
        cartStatus: false,
        payment:"cart",
        enabled: {
            authors: true,
            average_rating: true,
            bookID: true,
            isbn: true,
            language_code: true,
            price: true,
            ratings_count: true,
            title: true

        }
    }
    tempData = [{
        authors: "J.K. Rowling-Mary GrandPré",
        average_rating: 4.56,
        bookID: 1,
        isbn: 439785960,
        language_code: "eng",
        price: 230,
        ratings_count: 1944099,
        title: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)"
    },
    {
        authors: "J.K. Rowling-Mary GrandPré",
        average_rating: 4.49,
        bookID: 2,
        isbn: 439358078,
        language_code: "eng",
        price: 231,
        ratings_count: 1996446,
        title: "Harry Potter and the Order of the Phoenix (Harry Potter  #5)"
    },
    {
        authors: "J.K. Rowling-Mary GrandPré",
        average_rating: 4.56,
        bookID: 3,
        isbn: 439785960,
        language_code: "eng",
        price: 230,
        ratings_count: 1944099,
        title: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)"
    },
    ]

    // PER_PAGE = 10;
    // currentPage = this.state.selectedPage;
    // offset = this.currentPage * this.PER_PAGE;
    // pageCount = Math.ceil(this.state.rawData.length / this.PER_PAGE);
    //3rd commit

    componentDidMount = () => {
        axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json")
            .then(res => this.setState({ rawData: res.data, pageCount: Math.ceil(res.data.length / this.state.PER_PAGE) }, (() => console.log(this.state.rawData))))
        //this.setState({ rawData: this.tempData })

    }
    handlePageChange(e) {
        console.log("selected paage is " + e.selected);
        //this.setState({currentPage: pageNumber});
        this.setState(
            {
                currentPage: e.selected,
                offset: this.state.offset + e.selected * this.state.PER_PAGE
            })
    }
    addToCart = (data) => {
        this.setState({ cart: [...this.state.cart, data] }, () => console.log(this.state.cart))
    }
    removeFromCart = (data1) => {
        let idx = this.state.cart.findIndex(p => p.bookID == data1.bookID);
        console.log(this.state.cart.splice(idx, 1))
        this.setState({ cart: this.state.cart })
    }
    onPay = ({ number, name, expiry, cvc }) => {
        console.log(number, name, expiry, cvc)
        if (number == "4444 4444 4444 4444" && name == "ADITYA SATYAM" && expiry == "12/25" && cvc == 123) {
            alert("₹ " + this.state.cart.reduce((a, b) => a + b.price, 0) + " Paid")

            this.setState({cart: [],payment:"cart" })
        }
        else

            this.setState({payment:"cart"},()=>alert("wrong credentials"))

    }

    render() {
        return (
            <div style={{ color: "white", height: "100%", backgroundImage: `url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1741&q=80")` }}>

                <Navbar bg={"dark"} variant="dark" style={{ fontWeight: "bold" }}>
                    <Navbar.Brand onClick={() => this.setState({ cartStatus: false })}>Book Shop</Navbar.Brand>
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        <NavDropdown title="Sort by  ⭐" id="basic-nav-dropdown" onSelect={(e) => this.setState({ sort: e })}>
                            <NavDropdown.Item eventKey="yes">Yes</NavDropdown.Item>
                            <NavDropdown.Item eventKey="no">No</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={this.state.keyword} onChange={(e) => this.setState({ keyword: e.target.value, currentPage: 0, offset: 0 }, () => console.log(this.state.keyword))} />
                        <Button variant="light" style={{ fontSize: 30 }} onClick={() => this.setState({ cartStatus: true,payment:"cart" })}>🛒</Button>
                    </Form>
                </Navbar>
                <div>{!this.state.cartStatus ?
                    <div>
                        <div className="row" style={{ paddingTop: 24 }}>
                            {/* <div className="col-6" style={{fontSize:50}} /> */}
                            <div style={{ fontSize: 20, marginLeft: 10 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="bookID"
                                    checked={this.state.enabled.bookID} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, bookID: !this.state.enabled.bookID } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">Book Id</label>
                            </div>
                            <div style={{ fontSize: 20 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="isbn"
                                    checked={this.state.enabled.isbn} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, isbn: !this.state.enabled.isbn } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">ISBN</label>
                            </div>
                            <div style={{ fontSize: 20 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="title"
                                    checked={this.state.enabled.title} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, title: !this.state.enabled.title } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">Title</label>
                            </div>
                            <div style={{ fontSize: 20 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="average_rating"
                                    checked={this.state.enabled.average_rating} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, average_rating: !this.state.enabled.average_rating } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">Rating</label>
                            </div>
                            <div style={{ fontSize: 20 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="authors"
                                    checked={this.state.enabled.authors} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, authors: !this.state.enabled.authors } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">Author(s)</label>
                            </div>
                            <div style={{ fontSize: 20 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="language_code"
                                    checked={this.state.enabled.language_code} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, language_code: !this.state.enabled.language_code } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">Language</label>
                            </div>
                            <div style={{ fontSize: 20 }} className="col-1 row" >
                                <input className="col-2" type="checkbox" name="price"
                                    checked={this.state.enabled.price} style={{ height: 30 }}
                                    onChange={(e) => this.setState({ enabled: { ...this.state.enabled, price: !this.state.enabled.price } }, () => console.log(this.state.enabled))} />
                                <label className="col-10">Price</label>
                            </div>


                            <div className="col-5 row" style={{}}>
                                <div className="col-5" />
                                <div className="col-7" style={{ textAlign: "right" }}>
                                    <ReactPaginate

                                        previousLabel={"← Previous"}
                                        nextLabel={"Next →"}
                                        pageCount={this.state.pageCount}
                                        onPageChange={this.handlePageChange.bind(this)}
                                        containerClassName={"pagination"}
                                        previousLinkClassName={"page-link"}
                                        nextLinkClassName={"page-link"}
                                        disabledClassName={"disabled"}
                                        activeLinkClassName={"page-link"}
                                        //disabledLinkClassName={"page-link"}
                                        //pageClassName={"page-link"}
                                        subContainerClassName={"pages pagination"}
                                    />
                                </div>
                            </div>
                        </div>
                        <button disabled="disabled" className="row" style={{ width: "100%", color: "white", fontSize: 20, lineHeight: 3, backgroundColor: "black", opacity: 0.9 }} onClick={() => this.setState({ showModal: true })}>
                            {/* <img className="col-2" src={"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1741&q=80"}></img> */}
                            {this.state.enabled.bookID ? <div className="col-1">{"Book ID"}</div> : ""}
                            {this.state.enabled.isbn ? <div className="col-1">{"ISBN"}</div> : ""}
                            {this.state.enabled.title ? <div className="col-4">{"Title"}</div> : ""}
                            {this.state.enabled.average_rating ? <div className="col-1">{"Rating"}</div> : ""}
                            {this.state.enabled.authors ? <div style={{}} className="col-3">{"Author(s)"}</div> : ""}


                            {this.state.enabled.language_code ? <div className="col-1">{"Language"}</div> : ""}
                            {this.state.enabled.price ? <div className="col-1" style={{ color: "lightgreen" }}>{"Price"}</div> : ""}
                        </button>
                        {


                            this.state.rawData
                                .filter(data =>
                                    data.title.toString().toLowerCase().includes(this.state.keyword.toLowerCase())
                                    || data.authors.toLowerCase().includes(this.state.keyword.toLowerCase())
                                )
                                .sort((a, b) => {
                                    if (this.state.sort == "yes")
                                        return b.average_rating - a.average_rating
                                    else
                                        return 0
                                })
                                .slice(this.state.offset, this.state.offset + this.state.PER_PAGE)
                                ?.map(data => {
                                    return <div>
                                        <Book data={data} enabled={this.state.enabled} addToCart={this.addToCart} />

                                    </div>
                                })}
                    </div>
                    :
                    <div>{this.state.payment!="progress"?
                        <div>
                            {this.state.cart.map(data => { return <CartItem data={data} enabled={this.state.enabled} removeFromCart={this.removeFromCart} /> }
                            )}
                            <div style={{paddingLeft:"45%",fontWeight:"bold",fontSize:30,paddingBottom:"2%"}}>
                            <div>Total : ₹  {this.state.cart.reduce((a, b) => a + b.price, 0)}</div>
                            <Button style={{width:200,fontSize:30,marginLeft:"-2%",color:"green"}}variant="light" block disabled={this.state.cart.length==0 ? true : false}
                            onClick={()=>this.setState({payment:"progress"})
                            }
                            >
                                {"Pay ₹ " + this.state.cart.reduce((a, b) => a + b.price, 0)}
                            </Button>
                            </div>
                        </div>
                        :
                        <div style={{paddingLeft:"35%"}}>
                            <PaymentForm amount={this.state.cart.reduce((a, b) => a + b.price, 0)} onPay={this.onPay} />
                        </div>}

                    </div>
                }


                </div>
            </div>
        );
    }
}

export default Home;