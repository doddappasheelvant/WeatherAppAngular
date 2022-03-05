import { Component, OnInit, ViewChild } from '@angular/core';
import {Covid19Service} from '../covid19.service';
import {CountryReports} from 'src/countryReports';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {
  
  myDate;
  
  ELEMENT_DATA: CountryReports[];
  displayedColumns: string[] = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion', 'tests', 'testsPerOneMillion'];
  dataSource = new MatTableDataSource<CountryReports>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service:Covid19Service) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    this.getAllReports();
    this.myDate = new Date();
  }

  public getAllReports(){
    let Resp = this.service.covid19Reports();
    Resp.subscribe(report => this.dataSource.data=report as CountryReports[]);
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}