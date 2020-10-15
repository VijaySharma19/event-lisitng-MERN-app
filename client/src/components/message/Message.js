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
                <Modal.Header  closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" >
                    Alert!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div >
                        <h4 >
                            {this.props.message}
                        </h4>
                        <Button  
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
