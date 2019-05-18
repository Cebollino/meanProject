import { Component } from '@angular/core';

import { Post } from '../post.model'
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create-component.css']
})

export class PostCreateComponent {

    constructor(public postsService: PostService) {}

    onAddPost(form: NgForm) {
        console.log("hi")
        console.log(form.valid)

        if (form.invalid){
            return
        }

        console.log(form.value)
            const post: Post = {
                id: null,
                title: form.value.title,
                amount: form.value.amount
                }
            this.postsService.addPost(post)
    }
}