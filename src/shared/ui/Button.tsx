import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from "@/shared/lib/cn";


const buttonVariants = cva(
    "tw:rounded-lg tw:p-2 tw:px-4 tw:cursor-pointer",
    {
        variants: {
            intent:{
                default: ["tw:c-bg-theme-strong tw:c-text-theme-base tw:outline-1 tw:outline-service-gray"],
                select: ["tw:bg-service-primary tw:text-service-white"],
                cancel: ["tw:bg-service-red tw:text-service-white"],
            },
            size:{
                sm: ["tw:text-sm"],
                default: ["tw:text-base"],
                lg: ["tw:text-lg"],
                xl: ["tw:text-xl"],
            },
            disabled: {
                false: null,
                true: ["tw:opacity-50", "tw:cursor-not-allowed"],
            }

        },
        compoundVariants: [
            {
                intent: "select",
                disabled: false,
                className: "tw:hover:bg-service-secondary",
            }
        ],
        defaultVariants:{
            intent: "default",
            size: "default",
            disabled: false

        }
    }
)

const Button = forwardRef<HTMLButtonElement, AsChildProps>((props, ref) => {
    const { className, intent, size, asChild = false, disabled, ...defaultOptions } = props;
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ intent, size, className, disabled }))} ref={ref} disabled={disabled} {...defaultOptions} />;
 });
 
 export { Button };
 
 
 type AsChildProps = {
    asChild?: boolean;
 } & VariantProps<typeof buttonVariants> & ButtonHTMLAttributes<HTMLButtonElement>;

