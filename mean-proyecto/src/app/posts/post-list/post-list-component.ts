import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { Post } from '../post.model'
import { PostService } from '../posts.service';
@Component({
    selector: "app-post-list",
    templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = []
    private postsSub: Subscription

    constructor(public postsService: PostService) {
        
    }

    ngOnInit() {
        this.postsService.getPosts()
        this.postsSub = this.postsService.getPostUpdatedListenr().subscribe((posts: Post[]) =>{
            this.posts = posts
        })

    }

    ngOnDestroy() {
        this.postsSub.unsubscribe()
    }
}