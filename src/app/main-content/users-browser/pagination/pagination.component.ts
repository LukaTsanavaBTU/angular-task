import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  total = input.required<number>()
  usersThisPage = input.required<number>();
  page = signal<string>("1");
  lastPage = computed(() => Math.ceil(this.total() / 10)); 
  pagesArray = computed<number[]>(() => this.calculatePages());

  ngOnInit() {
    const subscription = this.route.queryParams.subscribe((val) => {
      if (val['page']) {
        this.page.set(val['page']);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  goPrevious() {
    if (+this.page() > 1) {
      this.router.navigate(['./'], {
        queryParams: { page: +this.page() - 1 },
      });
    }
  }

  goNext() {
    if (+this.page() < this.lastPage()) {
      this.router.navigate(['./'], {
        queryParams: { page: +this.page() + 1 },
      });
    }
  }

  private calculatePages() {
    const arr: number[] = [];
    const pageNum = parseInt(this.page());
    const firstPage = 1;
    if (pageNum > 3 && pageNum < this.lastPage() - 2) {
      for (let i = -2; i < 3; i++) {
        arr.push(pageNum + i);
      }
    } else if (pageNum > this.lastPage() - 3) {
      for (let i = this.lastPage() - 4; i < this.lastPage() + 1; i++) {
        arr.push(i);
      }
    }
     else {
      for (let i = firstPage; i < firstPage + 5; i++) {
        arr.push(i);
      }
    }
    return arr;
  }
}
