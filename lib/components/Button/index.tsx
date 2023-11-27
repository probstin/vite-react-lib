import Button from "@mui/material/Button";

export function CustomButton({ title }: { title?: string }) {
    return <Button variant="contained">{title || 'Click Me'}</Button>
}
