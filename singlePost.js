import React, { Component } from 'react';
import './blog.css';

import Image from '../../../components/Image/Image';


class Blog extends Component{
    state = {
        title: '',
        imageUrl: '',
        date: '',
        content: '',
        author: ''
    };

    componentDidMount(){
        const postId = this.props.match.params.postId;
        fetch('http://localhost:8080/graphql', {
            headers:{
                Authorization: 'Bearer' + this.props.token,
                'Content-Type': 'application/json'
            }
        })
            .then(res =>{
                return res.json();
            })
            .then(resData =>{
                this.setState({
                    title: resData.post.title,
                    author: resData.post.creator.name,
                    imageUrl: 'http://localhost:8080/' + resData.post.imageUrl,
                    date: new Date(resData.post.createdOn).toLocaleDateString('en-US'),
                    content: resData.post.content
                });
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div className="blog">
                <h1>{this.state.title}</h1>
                <h2>Created by {this.state.creator} on {this.state.date}</h2>
                <div>
                    <Image contain imageUrl={this.state.imageUrl}/>
                </div>
                <p>{this.state.content}</p>
            </div>
        );
    }
};

export default Blog;