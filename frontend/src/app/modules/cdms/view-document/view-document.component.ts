import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ActivatedRoute } from '@angular/router';


const typeDocuments = 'inventory documents';
const getFileUrl = (type: string, key: string): string => {
  return `https://d-m-s.s3.ap-southeast-2.amazonaws.com/${type}/${key}`;
};


@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  inventoryId: number= 0;
  loadImages: any[] = [];
  loadImagesUrls: string[] = [];
  images:any[] =[];


  constructor(
    private apiService : ApiHelperService,
    private route: ActivatedRoute,
  ){

  }

  ngOnInit(){
  
    this.route.params.subscribe(params => {
      this.inventoryId = params['inventoryId']; 
      this.loadDocuments
    });

  }

  loadDocuments(){

      this.apiService.get(`/picture/getPicture/${this.inventoryId}`)
      .subscribe(
        (data: any[]) => {
          this.loadImages = data;
          console.log('documents images:', this.loadImages);
          this.loadImagesUrls = this.loadImages.map((obj: any) => getFileUrl(typeDocuments,obj.link));
          console.log('url from s3:', this.loadImagesUrls);
          this.images = this.loadImagesUrls.map(url => ({ itemImageSrc: url }));
          console.log('document images',this.images)
        }
      );
  }


}
