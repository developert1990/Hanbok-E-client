import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// server단 즉 노드 에서는 aws에 배포를 할때 컨테이너 환경변수 NODE_ENV를 설정을 해줫는데 리액트에서는 build를 하면 자동으로 프로덕션으로 인식을해서 이렇게만 작성해주면 알아서 npm start하면 development로, build하면 production으로 판단을 한다.
export const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:9002' : `http://${process.env.REACT_APP_API_BASE}:9002`;

// material-ui constant Slider
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 300,
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        margin: {
            height: theme.spacing(3),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export const marks = [
    {
        value: 0,
        label: '$0',
    },
    {
        value: 50,
        label: '$50',
    },
    {
        value: 100,
        label: '$100',
    },
    {
        value: 200,
        label: '$200',
    },
    {
        value: 300,
        label: '$300',
    },
    {
        value: 400,
        label: '$400',
    },
];

export const valuetext = (value: number) => {
    return `$${value}`;
}




