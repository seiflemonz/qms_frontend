import { Inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Observable } from "rxjs";
import * as signalR from "@microsoft/signalr";
import { ClientDTO } from "../models/queue.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class QueueService {
    private url: string = environment.apiBaseUrl + '/Client';
    private hubConnection!: signalR.HubConnection;

    // Behaviour Subjects
    private queueUpdateSubject = new BehaviorSubject<ClientDTO | null>(null);
    queueUpdate$ = this.queueUpdateSubject.asObservable()

    private userIDSubject = new BehaviorSubject<string>('');
    userID$ = this.userIDSubject.asObservable()

    private currentPositionSubject = new BehaviorSubject<number | null>(null);
    currentPosition$ = this.currentPositionSubject.asObservable()

    private queueActivitySubject = new BehaviorSubject<boolean | null>(null);
    queueActivity$ = this.queueActivitySubject.asObservable()

    // Constructor
    constructor(private http: HttpClient) {
        this.loadUserIdFromLocalStorage();
        this.createSignalRConnection();
    }

    getRealtimeQueueUpdates(): Observable<ClientDTO | null> {
        return this.queueUpdate$
    }

    private createSignalRConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiBaseUrl}/qmsHub`, { withCredentials: true })
            .withAutomaticReconnect()
            .build();

        this.hubConnection.start().catch(err => console.error('Error while starting SignalR',
            err
        ))

        this.hubConnection.on("ReceiveQueueUpdate", (queueEntry: ClientDTO) => {
            console.log("Received popsition update: ", queueEntry);
            this.queueUpdateSubject.next(queueEntry)
        })

        this.hubConnection.on("ReceivePositionUpdate", (position: number) => {
            console.log("Received popsition update: ", position);
            this.currentPositionSubject.next(position)
        })

        this.hubConnection.on("ReceiveQueueActive", (queueActive: boolean) => {
            console.log("Received popsition update: ", queueActive);
            this.queueActivitySubject.next(queueActive)
        })
    }

    private loadUserIdFromLocalStorage(): void {
        const savedUserId = localStorage.getItem('userId')
        if (savedUserId) {
            this.userIDSubject.next(savedUserId)
        }
    }

    setUserId(userId: string) {
        this.userIDSubject.next(userId);
        localStorage.setItem('userId', userId)
    }

    setQueueStatus(status:boolean): Observable<boolean>{
        return this.http.post<boolean>(`${this.url}/SetQueueActive?queueActive=${status}`, { withCredentials: true})
    }

    getQueueStatus(): Observable<boolean>{
        return this.http.get<boolean>(`${this.url}/GetQueueActive`, { withCredentials: true})
    }

    addClient(client: any): Observable<ClientDTO>{
        return this.http.post<ClientDTO>(`${this.url}/AddClient`, client, { withCredentials: true})
    }

    getUserQueue(userId: string): Observable<ClientDTO | null> {
        return this.http.get<ClientDTO>(`${this.url}/GetClientFromId?user_id=${userId}`, { withCredentials: true })
    }

    getCurrentlyServingNumber(): Observable<number>{
        return this.http.get<number>(`${this.url}/GetCurrentPosition`, { withCredentials: true})
    }

    // Admin Functions

    getAllClients(): Observable<ClientDTO[]> {
        return this.http.get<ClientDTO[]>(`${this.url}/GetAllClients `, { withCredentials: true })

    }
    
      nextClient(): Observable<void> {
        return this.http.post<void>(`${this.url}/NextClientFunc`, null);
      }
    
      skipClient(): Observable<void> {
        return this.http.post<void>(`${this.url}/SkipClient`, null);
    }

}