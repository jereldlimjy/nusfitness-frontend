describe('The Home Page', () => {
    it('successfully loads', function () {
        cy.visit('/')
    })
})

// Login page url
describe('The Login Page', () => {
    it('successfully loads', function () {
        cy.visit('/nusfitness?#/nusfitness/login')
    })
})

// Register page url
describe('The Registration Page', () => {
    it('successfully loads', function () {
        cy.visit('/nusfitness?#/nusfitness/register')
    })
})

// Can login with given username and password
describe('Logging In', () => { 
    it('successfully logs in', function () {
        const email = 'jereld.lim@u.nus.edu';
        const password = 'test';

        cy.request('POST', 'http:localhost:5000/login', {
            email,
            password
        })

        cy.visit('/');

        cy.get('h4').should('contain', 'Book a Facility');
    })
})

// Can logout successfully
describe('Logging Out', () => { 
    it('successfully logs out', function () {
        const email = 'jereld.lim@u.nus.edu';
        const password = 'test';

        cy.request('POST', 'http:localhost:5000/login', {
            email,
            password
        })

        cy.visit('/');

        cy.get('h4').should('contain', 'Book a Facility');

        cy.request('GET', 'http:localhost:5000/logout', {
        })

        cy.visit('/');

        cy.get('a').should('contain', 'Login');
    })
})

// Dashboard page url
describe('The Dashboard', () => {
    it('successfully loads', function () {
        const email = 'jereld.lim@u.nus.edu';
        const password = 'test';

        cy.request('POST', 'http:localhost:5000/login', {
            email,
            password
        })

        cy.visit('/nusfitness?#/nusfitness/dashboard');

        cy.get('h4').should('contain', 'Filters');
    })
})

// Booking page url
describe('View Bookings Page', () => {
    it('successfully loads', function () {
        const email = 'jereld.lim@u.nus.edu';
        const password = 'test';

        cy.request('POST', 'http:localhost:5000/login', {
            email,
            password
        })

        cy.visit('/nusfitness?#/nusfitness/bookings');

        cy.get('h4').should('contain', 'View Bookings');
    })
})

// Can book slot

// can view slot in bookings


// can cancel slot