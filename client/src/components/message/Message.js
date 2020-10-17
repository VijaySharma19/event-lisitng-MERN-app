import React, { Component } from 'react'
import {Modal,Button} from "react-bootstrap"
export class Message extends Component {
    
    render() {
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
                >
                <Modal.Header style={{backgroundColor:'#463333',color:'#fff0f0'}}  closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" >
                    <span style={{backgroundColor:'#463333'}}>Alert!</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign:'center',backgroundColor:'#fff0f0'}} >
                    <div >
                        <h4 style={{textAlign:'center'}} >
                            {this.props.message}
                        </h4>
                        <Button  
                            style={{backgroundColor:'#463333',color:'#fff0f0'}}
                            onClick={this.props.onHide} 
                        >
                            Okay!
                        </Button>
                    </div>
                    
                </Modal.Body>
                {/* <Modal.Footer style={{backgroundColor:"#eeeeee",color:"#393e46"}}>
                    
                </Modal.Footer> */}
            </Modal>
        )
    }
}

export default Message
