import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Popover, PopoverBody, PopoverHeader, Tooltip } from 'mdbreact';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css'

class ModalCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal15: false,
      date: Date.now(),
      range: 1,
      ids: [],
      title: '',
      description: '',
      hour: '',
      min: ''
    };

    // this.dateSplitter = this.dateSplitter.bind(this);
  }

  onChange = date => this.setState({ date });

//   dateSplitter(date) {
//     let splittedDate = date.split('T');
//     let newDate = splittedDate[0].substr(1);
//     let newTime = splittedDate[1].slice(0, -1).split(".")[0];
//     let updatedDate = newDate.split('-')
//     let updatedDate2 = `${updatedDate[0]}-${updatedDate[1]}-${+updatedDate[2] }`
//     let timeStamp = {
//         date : updatedDate2,
//         time : newTime
//     };
        
//     return timeStamp;
// }

  toggle(nr) {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  render() {
    let { date, range } = this.state;

    return (
      <Container>
        <button className="btn btn-warning rouded-button" onClick={() => this.toggle(15)}>Edit your Event</button>
        <Modal isOpen={this.state.modal15} toggle={() => this.toggle(15)}>
          <ModalHeader toggle={() => this.toggle(15)}>Edit Event</ModalHeader>
          <ModalBody>
            <div className="col-lg-12">
              <p>Choose a new date</p>
              <Calendar onChange={this.onChange}/>
            </div>

            <form>
              <div className="card shadow-lg mb-3">
                <div className="card-body">
                  <h3 className="text-sm-center">
                    {/* {this.dateSplitter(date).date } */}
                  </h3>
                </div>
              </div>

              <div className="text-sm-center form-group">
                <div class="md-form">
                  <input name="title" onChange={ this.handleInputs } type="text" id="form1" class="form-control"/>
                  <label for="form1">Title</label>
                </div>
              </div>

              <div class="md-form">
                <textarea onChange={ this.handleInputs } name="description"  type="text" id="form10" class="md-textarea form-control" rows="3"></textarea>
                <label for="form10">Description</label>
              </div>
        
              <div className="custom-control custom-checkbox">
                        <input onChange={ this.isPrivate } type="checkbox" name="private" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Private</label>
                    </div>
                    {/* <label class="bs-switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                    </label> */}

                    <div>
                        <p>{ range } person</p>
                        {/* <form class="range-field my-4 w-25">
                            <input type="range" min="0" max="100" />
                        </form> */}
                        <input
                            type="range"
                            onChange={ this.handleInputs }
                            name="range"
                            min="1"                  
                            max="15"                  
                            step="1"
                            value={ range }                  
                            data-orientation="vertical" />
                    </div>
                    
                    <div>
                        <input name="hour" type="number" min="0" max="23" onChange={ this.handleInputs } placeholder="Hour"/>:
                        <input name="min" type="number" min="0" max="59" onChange={ this.handleInputs } placeholder="Minute"/>
                    </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ModalCenter;