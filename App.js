import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import Formulario from './src/components/Formulario';
import Pais from './src/components/Pais';

export default function App() {
    const [busqueda, guardarbusqueda] = useState({ pais: '' });
    const [consultar, guardarconsultar] = useState(false);
    const [resultado, guardarresultado] = useState({});
    const [cargando, guardarCargando] = useState(false);
    const [paisActual, guardarPaisActual] = useState(''); 
    useEffect(() => {
        const { pais } = busqueda;
        const consultarPais = async () => {
            if (consultar && pais) {
                guardarCargando(true);
                try {
                    const url = `https://servicodados.ibge.gov.br/api/v1/paises/${pais}`;
                    const respuesta = await fetch(url);
                    
                    if (!respuesta.ok) {
                        throw new Error('No se pudo obtener la información del país');
                    }
                    
                    const resultado = await respuesta.json();
                    guardarresultado(resultado);
                    guardarPaisActual(pais);
                } catch (error) {
                    mostrarAlerta(error.message);
                } finally {
                    guardarconsultar(false);
                    guardarCargando(false);
                }
            }
        };
        consultarPais();
    }, [consultar]);

    const mostrarAlerta = (mensaje = 'No hay resultados, intenta con otro país') => {
        Alert.alert('Error', mensaje, [{ text: 'Ok' }]);
    };

    return (
        <View style={styles.app}>
            <View style={styles.contenido}>
                <View style={{ zIndex: 1000 }}>
                    <Formulario
                        busqueda={busqueda}
                        guardarbusqueda={guardarbusqueda}
                        guardarconsultar={guardarconsultar}
                    />
                </View>
                <View style={{ zIndex: 1 }}>
                    {cargando ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        Object.keys(resultado).length > 0 && <Pais resultado={resultado} codigoPais={paisActual} />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: 'rgb(71,149,212)',
        justifyContent: 'center',
    },
    contenido: {
        margin: '2.5%',
    },
    loading: {
        marginTop: 20,
    }
});