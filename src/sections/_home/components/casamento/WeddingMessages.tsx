/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  List,
  Divider,
  Avatar,
  Fade,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';
import { supabase } from 'src/utils/supabaseClient';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
`;

const float = keyframes`
  0% { transform: translateY(0px);}
  50% { transform: translateY(-10px);}
  100% { transform: translateY(0px);}
`;

const StyledRoot = styled('div')(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 60%, ${theme.palette.primary.light} 100%)`,
  padding: theme.spacing(10, 2, 8, 2),
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeIn} 1s ease-out`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12, 0, 10, 0),
  },
}));

const FloatingIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  opacity: 0.08,
  zIndex: 0,
  color: theme.palette.primary.main,
  animation: `${float} 7s ease-in-out infinite`,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  position: 'relative',
  display: 'inline-block',
  letterSpacing: 1,
  textShadow: '0 2px 8px rgba(0,0,0,0.08)',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 2,
  },
}));

const MessagePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  marginBottom: theme.spacing(3),
  background: `linear-gradient(120deg, ${theme.palette.background.default} 80%, ${theme.palette.primary.lighter} 100%)`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  animation: `${fadeIn} 0.7s ease-out`,
  position: 'relative',
  overflow: 'visible',
  transition: 'box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
    transform: 'translateY(-2px) scale(1.01)',
  },
}));

const NameRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
}));

const AvatarIcon = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  width: 38,
  height: 38,
  fontSize: '1.1rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}));

const MessageText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.08rem',
  lineHeight: 1.7,
  whiteSpace: 'pre-line',
  marginBottom: theme.spacing(1),
}));

const DateText = styled(Typography)(({ theme }) => ({
  textAlign: 'right',
  color: theme.palette.text.disabled,
  fontSize: '0.85rem',
  marginTop: theme.spacing(1),
}));

interface GuestMessage {
  id: number;
  nome: string;
  mensagem: string;
  created_at: string;
}

const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const WeddingMessages: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('confirmacao_convidado')
          .select('id, nome, mensagem, created_at')
          .neq('mensagem', '')
          .order('created_at', { ascending: false })
          .limit(30);

        if (error) throw error;
        if (isMounted) setMessages(data || []);
      } catch (err: any) {
        setError('Erro ao carregar mensagens. Tente novamente mais tarde.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledRoot>
      {/* Elementos decorativos flutuantes */}
      <FloatingIcon sx={{ top: '8%', left: '4%', fontSize: '5rem' }}>
        <Icon icon="mdi:message-heart" />
      </FloatingIcon>
      <FloatingIcon sx={{ bottom: '10%', right: '6%', fontSize: '4rem', animationDelay: '2s' }}>
        <Icon icon="mdi:heart" />
      </FloatingIcon>
      <FloatingIcon sx={{ top: '50%', left: '90%', fontSize: '3.5rem', animationDelay: '4s' }}>
        <Icon icon="mdi:flower" />
      </FloatingIcon>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in timeout={900}>
          <Box>
            <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
              <Title variant="h3">Recados dos Convidados</Title>
            </Box>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ my: 4 }}>
                {error}
              </Alert>
            ) : !messages.length ? (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                Nenhuma mensagem deixada ainda. Seja o primeiro a deixar um recado para os noivos!
              </Typography>
            ) : (
              <List disablePadding>
                {messages.map((msg) => (
                  <React.Fragment key={msg.id}>
                    <MessagePaper elevation={3}>
                      <NameRow>
                        <AvatarIcon>{getInitials(msg.nome)}</AvatarIcon>
                        <Typography variant="subtitle1" color="primary" fontWeight={600}>
                          {msg.nome}
                        </Typography>
                      </NameRow>
                      <MessageText>
                        <Icon
                          icon="mdi:format-quote-open"
                          style={{
                            fontSize: 18,
                            opacity: 0.5,
                            marginRight: 4,
                            verticalAlign: 'middle',
                          }}
                        />
                        {msg.mensagem}
                      </MessageText>
                      <DateText>
                        {new Date(msg.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </DateText>
                    </MessagePaper>
                    <Divider sx={{ my: 1.5, borderColor: 'primary.lighter', opacity: 0.3 }} />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Fade>
      </Container>
    </StyledRoot>
  );
};

export default WeddingMessages;
