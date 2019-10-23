import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';
import { isAuthenticated } from '../../services/auth';
import { Form, Container } from './style';

class SignIn extends Component {
    state = {
        usuario: '',
        senha: '',
        error: '',
    };

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.history.push('/main');
        }
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { usuario, senha } = this.state;
        if (!usuario || !senha) {
            this.setState({ error: 'Preencha e-mail e senha para continuar!' });
        } else {
            try {
                const response = await api.post('/login', {
                    usuario,
                    senha,
                });
                login(response.data.token);
                this.props.history.push('/main');
            } catch (err) {
                this.setState({
                    error:
                        'Houve um problema com o login, verifique suas credenciais. T.T',
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        onChange={e =>
                            this.setState({ usuario: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ senha: e.target.value })}
                    />
                    <button type="submit">Entrar</button>
                    <hr />
                    <Link to="/signup">Criar conta grátis</Link>
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignIn);
