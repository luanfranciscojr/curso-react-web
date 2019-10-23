import React, { Component } from 'react';
import { Container, Form, SubmitButton } from './style';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: 0,
    };

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
        const { newRepo, loading } = this.state;
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
            </Container>
        );
    }
}
