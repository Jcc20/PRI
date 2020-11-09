<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arqweb/index.html">
            
            
            <html>
                <head>
                    <title>Arqueossitios</title>
                </head>
                <body>
                    <h3>Arqueossitios</h3>
                    <ul>
                        <xsl:apply-templates mode="indice" select="//ARQELEM">
                            <xsl:sort select="normalize-space(IDENTI)" lang="pt"/>
                        </xsl:apply-templates>
                    </ul>             
                </body>    
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM"> 
            <xsl:sort select="normalize-space(IDENTI)" lang="pt"/>
        </xsl:apply-templates> 
    </xsl:template>
    
    
    
    
    <!--     Templates para o indice      -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:7777/arqs/{position()}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    <!--     Templates para o conteudo      -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="arqweb/{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>Identificação</b>:<xsl:value-of select="IDENTI"/></p>
                    <xsl:if test="IMAGEM">
                        <p>
                            <b>Imagem</b>:
                            <xsl:value-of select="IMAGEM"/> 
                        </p>
                    </xsl:if>
                    <p><b>Descrição</b>:<xsl:apply-templates select="DESCRI"/></p>
                    <xsl:if test="CRONO"> 
                        <p>
                            <b>Era cronológica</b>:
                            <xsl:value-of select="CRONO"/> 
                        </p>
                    </xsl:if>
                    <p><b>Lugar</b>:<xsl:apply-templates select="LUGAR"/></p>
                    <p><b>Freguesia</b>:<xsl:apply-templates select="FREGUE"/></p>
                    <p><b>Concelho</b>:<xsl:value-of select="CONCEL"/></p>
                    <xsl:if test="CODAM">
                        <p>
                            <b>Código</b>:
                            <xsl:value-of select="CODAM"/> 
                        </p>
                    </xsl:if>
                    <xsl:if test="LATITU">
                        <p>
                            <b>Latitude</b>:
                            <xsl:value-of select="LATITU"/> 
                        </p>
                    </xsl:if>
                    <xsl:if test="LONGIT">
                        <p>
                            <b>Longitude</b>:
                            <xsl:value-of select="LONGIT"/> 
                        </p>
                    </xsl:if>
                    <xsl:if test="ALTITUD">
                        <p>
                            <b>Longitude</b>:
                            <xsl:value-of select="ALTITUD"/> 
                        </p>
                    </xsl:if>
                    <xsl:if test="ACESSO">
                        <p>
                            <b>Acesso</b>:
                            <xsl:apply-templates select="ACESSO"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="QUADRO">
                        <p>
                            <b>Quadro</b>:
                            <xsl:apply-templates select="QUADRO"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="TRAARQ">
                        <p>
                            <b>Trabalhos arqueológicos</b>:
                            <xsl:apply-templates select="TRAARQ"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="DESARQ">
                        <p>
                            <b>Desarquivamentos</b>:
                            <xsl:apply-templates select="DESARQ"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="INTERP">
                        <p>
                            <b>Interpretação arqueológica</b>:
                            <xsl:apply-templates select="INTERP"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="DEPOSI">
                        <p>
                            <b>Depósitos</b>:
                            <xsl:apply-templates select="DEPOSI"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="INTERE">
                        <p>
                            <b>Interesse arqueológico</b>:
                            <xsl:apply-templates select="INTERE"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="TRAARQ">
                        <p>
                            <b>Trabalhos arqueológicos</b>:
                            <xsl:value-of select="TRAARQ"/> 
                        </p>
                    </xsl:if>
                    <xsl:if test="BIBLIO">
                        <p><b>Bibliografia</b></p>
                        <ul>
                            <xsl:apply-templates select="BIBLIO"/>
                        </ul>
                    </xsl:if>
                    <p><b>Autor</b>:<xsl:value-of select="AUTOR"/></p>
                    <p><b>Data</b>:<xsl:value-of select="DATA"/></p>
                    <address>[<a href="http://localhost:7777/arqs/*">Voltar ao indice</a>]</address>
                </body> 
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
        <li><xsl:apply-templates/></li>
    </xsl:template>
    <xsl:template match="DESCRI">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="LUGAR">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="FREGUE">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="INTERP">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="INTERE">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="LIGA">
        <u>
            <xsl:value-of select="."/>
        </u>
    </xsl:template>
    
</xsl:stylesheet>