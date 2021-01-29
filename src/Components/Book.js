import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import background from '../Resources/background.jpeg'

class Book extends Component {
    state = { showModal: false }
    render() {
        return (
            <div>
                {/* <div className="row button" style={{width:"100%"}} onPointerEnter={()=>console.log(this.props.data.authors)} onClick={()=>console.log("hello")}> */}
                <button className="row" style={{ width: "100%", color: "white", fontSize: 19, lineHeight: 1.5, backgroundColor: "black", opacity: 0.7 }} onClick={() => this.setState({ showModal: true })}>
                    {/* <img className="col-2" src={"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1741&q=80"}></img> */}
                    {this.props.enabled.bookID?<div className="col-1">{this.props.data.bookID}</div>:""}
                    {this.props.enabled.isbn?<div className="col-1">{this.props.data.isbn}</div>:""}
                    {this.props.enabled.title?<div className="col-4">{this.props.data.title}</div>:""}
                    {this.props.enabled.average_rating?
                    <div className="col-1">
                        <div>{"⭐".repeat(Math.floor(this.props.data.average_rating))}</div>
                        <div style={{fontSize:15}}>{"("+this.props.data.average_rating+")"}</div>
                        <div>{this.props.data.ratings_count }</div>
                        <div style={{fontSize:15}}>{"ratings"}</div>
                    </div>:""}
                    {this.props.enabled.authors?<div style={{}} className="col-3">{this.props.data.authors.split("-").map(data => {
                        return <div>{data}</div>
                    }
                    )}</div>:""}


                    {this.props.enabled.language_code?<div className="col-1">{this.props.data.language_code}</div>:""}
                    {this.props.enabled.price?<div className="col-1" style={{ color: "lightgreen" }}>{"₹ " + this.props.data.price}</div>:""}
                    {/* <div className="col-1">{(new Array(Math.floor(this.props.data.ratings_count))).map(this.props.data=>"⭐")}</div> */}

                </button>
                {/* <Button variant="primary" onClick={() => this.setState({showModal:true})}>
        Launch vertically centered modal
      </Button> */}

                <MyVerticallyCenteredModal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    data={this.props.data}
                    addToCart={this.props.addToCart}
                />





            </div>
        );
    }
}

export default Book;


function MyVerticallyCenteredModal(props) {
    return (

        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ className: "container" }}

        >
            {/* <div style={{ color:"white",backgroundColor:"grey",backgroundImage: `url("https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80")` }}> */}
            <div style={{ color:"white",backgroundColor:"grey",opacity:0.7}}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.data.title}
                        {"⭐".repeat(Math.floor(props.data.average_rating))}
                    </Modal.Title>
                    
                    
                </Modal.Header>
                <Modal.Body>
                    <div className="" style={{ height: 200,color:"white",fontWeight:"bold" }}>
                        <div className="">By:</div>
                        <div style={{}} className="">{props.data.authors?.split("-").map(data=><div>{data}</div>)}</div>
                        <div style={{color:"lightgreen"}}>Price : ₹ {props.data.price}</div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={()=>props.addToCart(props.data)}>🛒 Buy Now</Button>
                    <Button variant="light" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}