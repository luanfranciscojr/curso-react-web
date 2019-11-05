import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './style';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: 0,
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');
        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.repositories !== this.state.repositories) {
            localStorage.setItem(
                'repositories',
                JSON.stringify(this.state.repositories)
            );
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: 1 });
        const { newRepo, repositories } = this.state;
        const response = await api.get(`repos/${newRepo}`);
        const data = {
            name: response.data.full_name,
        };
        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: 0,
        });
    };
    render() {
        const { newRepo, loading, repositories } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleInputChange}
                        type="text"
                        value={newRepo}
                        placeholder="Adicionar repositório"
                    />
                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
