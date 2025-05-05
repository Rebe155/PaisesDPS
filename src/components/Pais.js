import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Pais = ({ resultado, codigoPais }) => {
    const [nombre, setnombre] = useState("");
    const [capital, setcapital] = useState("");
    const [region, setregion] = useState("");
    const [lengua, setlengua] = useState([]);
    const [area, setarea] = useState("");

    useEffect(() => {
        if (resultado) {
            const newLengua = [];
            Object.values(resultado).forEach((e) => {
                setnombre(e.nome?.abreviado || "");
                setcapital(e.governo?.capital?.nome || "");
                setregion(e.localizacao?.regiao?.nome || "");
                setarea(e.area?.total || "0");

                Object.values(e.linguas || {}).forEach((l) => {
                    newLengua.push(l.nome);
                });
            });
            setlengua(newLengua);
        }
    }, [resultado]);

    const formatArea = (area) => {
        return parseFloat(area).toLocaleString('es-ES') + " km²";
    };

    const getCodigoBandera = () => {
        const codigos = {
            'sv': 'sv',
            'ca': 'ca',
            'gt': 'gt',
            'hn': 'hn',
            'ni': 'ni',
            'pa': 'pa',
            'cr': 'cr',
            'mx': 'mx',
            'ar': 'ar',
            'us': 'us',
            'co': 'co',
            'es': 'es',
            'pe': 'pe'
        };
        return codigos[codigoPais] || 'un';
    };
    const banderaUrl = `https://flagcdn.com/w320/${getCodigoBandera()}.png`;

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{nombre}</Title>
                
                <Image 
                    source={{ uri: banderaUrl }}
                    style={styles.flag}
                    resizeMode="contain"
                    onError={(e) => console.log("Error cargando bandera:", e.nativeEvent.error)}
                />
                
                <Paragraph style={styles.text}>Capital: {capital}</Paragraph>
                <Paragraph style={styles.text}>Región: {region}</Paragraph>
                <Paragraph style={styles.text}>Idiomas: {lengua.join(", ")}</Paragraph>
                <Paragraph style={styles.text}>Área: {formatArea(area)}</Paragraph>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#2c3e50',
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
        color: '#34495e',
    },
    flag: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        alignSelf: 'center',
        backgroundColor: '#eaeaea',
    },
});

export default Pais;