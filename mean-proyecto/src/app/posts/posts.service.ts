import { Post } from './post.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = []
    private postUpdated = new Subject<Post[]>()
    
    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    amount: post.amount,
                    id: post._id
                }
            })
        }))
        .subscribe((transformedPost) => {
            this.posts = transformedPost
            this.postUpdated.next([...this.posts])
        })
    }

    getPostUpdatedListenr() {
        return this.postUpdated.asObservable()
    }

    addPost(post: Post) {
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
            console.log(responseData)
            this.posts.push(post)
            this.postUpdated.next([...this.posts])
        })}

}