import { Client } from './../models/client';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection:AngularFirestoreCollection<Client>;
  clientDoc:AngularFirestoreDocument<Client>;
  client:Observable<Client[]>;
  constructor(private afs:AngularFirestore) 
    {
      this.clientsCollection=this.afs.collection('clients');
   }

   getClients(iduser:string):Observable<Client[]>{
    return this.afs.collection('clients',ref=>ref.where('user','==',iduser)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }
   addClient(client:Client){
     this.clientsCollection.add(client)
   }
   getClient(id:string):Observable<Client>{
     return this.clientsCollection.doc(id).valueChanges();
   }
   updateClient(client:Client){
     this.clientDoc= this.clientsCollection.doc(client.id)
     this.clientDoc.update(client)
   }
   deleteClient(id:string){
     this.clientDoc=this.clientsCollection.doc(id);
     this.clientDoc.delete();
   }
}
