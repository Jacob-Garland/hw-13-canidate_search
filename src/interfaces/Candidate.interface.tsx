// DONE TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    readonly name: string;
    readonly login: string;
    readonly avatar_url: string;
    readonly email: string;
    readonly location: string;
    readonly company: string;
    readonly bio: string;
    readonly html_url: string;
}