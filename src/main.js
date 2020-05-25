import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('formRepo');
        this.inputEl = document.querySelector('input[name=repository')
        this.listEl = document.getElementById('listRepo');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');
            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const inputRepo = this.inputEl.value;
        
        if (inputRepo.lenght === 0) 
            return;

        this.setLoading();

        try {
            const response = await api.get(`/users/${inputRepo}`)
        
            const { login, bio, html_url, avatar_url } = response.data;

            this.repositories.push({
                login,
                bio,
                html_url,
                avatar_url
            });

            this.inputEl.value = '';

            this.render();
        } catch(err) {
            alert('O repositório não existe!');
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.login));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.bio));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('See'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        })
    }

    
}

new App();