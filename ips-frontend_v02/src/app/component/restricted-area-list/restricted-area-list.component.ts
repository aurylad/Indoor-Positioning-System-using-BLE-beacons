import { Component, OnInit } from '@angular/core';
import { RestrictedArea, Plan } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { EditDataService } from 'src/app/api/services/edit-data.service';

@Component({
  selector: 'app-restricted-area-list',
  templateUrl: './restricted-area-list.component.html',
  styleUrls: ['./restricted-area-list.component.css']
})
export class RestrictedAreaListComponent implements OnInit {

  private restrictedAreas: RestrictedArea[];
  private plan: Plan = {};

  displayedColumnsRestrArea: string[] = ['restrictedAreaName', 'accessLevel', 'planId', 'actions'];
  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(private _apiService: ApiService, private service: EditDataService) { }

  ngOnInit() {
    this.getRestrictedAreas();
  }

  getRestrictedAreas(): RestrictedArea[] {
    this._apiService.getRestrictedArea().subscribe((restrictedAreas) => {
      this.restrictedAreas = restrictedAreas
    }, (error) => {
      console.log(error);
    })
    return this.restrictedAreas;
  }

  onEditArea(row): void {
    console.log(row);
    this._apiService.getPlanByPlanName(row.planId).subscribe((plan) => {
      console.log(plan);

      this.img.onload = () => {
        const canvas = <HTMLCanvasElement>document.getElementById("areaCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = plan.planWidth;
        canvas.height = plan.planHeight;
        ctx.drawImage(this.img, 0, 0);

        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "red";
        var middleX = (row.topLeftCoordX / 2) + (row.topRightCoordX / 2);
        var middleY = (row.topRightCoordY / 2) + (row.bottomRightCoordY / 2);
        var strokeLenght = row.topRightCoordX - row.topLeftCoordX //X
        var strokeWidth = row.bottomRightCoordY - row.topRightCoordY //Y
        ctx.fillRect(row.topLeftCoordX, row.topLeftCoordY, strokeLenght, strokeWidth);
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "black";
        ctx.font = "20px Verdana";
        ctx.textAlign = "center";
        ctx.fillText(row.restrictedAreaName, middleX, middleY);
        ctx.globalAlpha = 0.5;
        ctx.font = "17px Verdana";
        ctx.fillText("(" + row.accessLevel + ")", middleX, middleY + 25);
      }
      this.img.src = plan.planImage;
      this.plan = plan;
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida.");
    })
  }

  onDeleteArea(row): void {
    if (confirm('Ar tikrai norite ištrinti šią zoną?')) {
      this.service.areaSetter(row);
      this._apiService.deleteRestrictedArea(this.service.areaGetter().id).subscribe((deletedArea) => {
        this.restrictedAreas = this.getRestrictedAreas();
      }, (error) => {
        console.log(error);
        alert('Panaikinti šios zonos nepavyko.');
      });
    }
  }

}
