import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Pais = ({ resultado }) => {
    const [info, setinfo] = useState([]);
    const [nombre, setnombre] = useState("");
    const [capital, setcapital] = useState("");
    const [region, setregion] = useState("");
    const [lengua, setlengua] = useState([]);

    useEffect(() => {
        setinfo(resultado);
        lengua.length=0;
            Object.values(info).map((e) => {
                setnombre(e.nome.abreviado);
                setcapital(e.governo.capital.nome);
                setregion(e.localizacao.regiao.nome);

                Object.values(e.linguas).map((l) => {
                    lengua.push(l.nome);
                });
            });
        });

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{nombre}</Title>
                <Paragraph>Capital: {capital}</Paragraph>
                <Paragraph>Region: {region}</Paragraph>
                <Paragraph>Lenguas: {lengua.join(", ")}</Paragraph>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
});

export default Pais;