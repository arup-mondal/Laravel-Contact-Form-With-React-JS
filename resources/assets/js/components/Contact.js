import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Contact extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            message:'',
            isLoading:false,
            msg:{},
            msgCls:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        var _this = this;
        this.setState({
            isLoading:true
        })
        var {name,email,message} = this.state; 
        fetch('/api/contact', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                name:name,
                email:email,
                message:message
            })
        }).then(function(response) {
            console.log(response.status);
            switch(response.status){
                case 200:
                    _this.setState({msgCls:'alert alert-success'});
                    break;
                case 400:
                    _this.setState({msgCls:'alert alert-danger'});
                    break; 
                default:
                    _this.setState({msgCls:'alert alert-danger'});
                    break;
            }
            return response.json();
        }).then(function(data) {
           _this.setState({
                name:'',
                email:'',
                message:'',
                isLoading:false,
                msg:data
           }) 
        });
    }
    render() {
        var {msg,msgCls,name,email,message,isLoading} = this.state;
        var msgs = '';
        Object.keys(msg).forEach(function(key) {
            msgs+=`<p>`+msg[key]+`</p>`;
        });

        return (
            <div className="container">
                {isLoading &&
                    <div className="hasLoader">
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div>
                }
                <div className="row justify-content-md-center">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="well well-sm">
                            {msgs &&
                                <div className={`${msgCls}`} dangerouslySetInnerHTML={{__html:msgs}} />
                            }
                            <form className="form-horizontal" action="" method="post" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <legend className="text-center">Contact us</legend>
                            
                                    <div className="form-group">
                                    <label className="col-md-12 control-label" htmlFor="name">Name</label>
                                    <div className="col-md-12">
                                        <input id="name" name="name" type="text" required value={name} onChange={this.handleChange}  placeholder="Your name" className="form-control" />
                                    </div>
                                    </div>
                            
                                    <div className="form-group">
                                    <label className="col-md-12 control-label" htmlFor="email">Your E-mail</label>
                                    <div className="col-md-12">
                                        <input id="email" name="email" type="email" required value={email}  onChange={this.handleChange}  placeholder="Your email" className="form-control" />
                                    </div>
                                    </div>
                            
                                    <div className="form-group">
                                    <label className="col-md-12 control-label" htmlFor="message">Your message</label>
                                    <div className="col-md-12">
                                        <textarea className="form-control"  required value={message} onChange={this.handleChange} id="message" name="message" placeholder="Please enter your message here..." rows="5"></textarea>
                                    </div>
                                    </div>
                            
                                    <div className="form-group">
                                    <div className="col-md-12 text-right">
                                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('contact')) {
    ReactDOM.render(<Contact />, document.getElementById('contact'));
}
